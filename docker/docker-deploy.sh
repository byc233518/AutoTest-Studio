#!/bin/sh
# JMOM 自动化测试平台 - 目标服务器一键打包更新脚本
#
# 在目标服务器上进入仓库根目录后直接执行本脚本，会依次完成：
#   1. 校验仓库目录
#   2. 修复宿主机挂载目录权限（关键：解决容器内 node 用户无法写入
#      /app/platform-data/uploads 等子目录导致启动失败的问题）
#   3. 构建镜像
#   4. 启动/更新容器
#   5. 健康检查
#
# 调用示例（Jenkins Publish over SSH 远端调用）：
#   cd /data2/QTP && sh docker/docker-deploy.sh

set -eu

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCKER_DIR="$(dirname "$0")"

cd "$PROJECT_DIR"

echo "==> [1/5] 代码目录就绪: $PROJECT_DIR"

# /app/platform-data 在 compose 里以宿主机 ./platform-data 挂载进容器。
# 该目录若由 root 创建，容器内非 root 的 node 用户将无法创建
# uploads/reports/recordings/scripts/tmp 等子目录，从而抛出：
#   EACCES: permission denied, mkdir '/app/platform-data/uploads'
# 这里先强制让这些目录对组/其它用户可写，确保 node 用户可正常落盘。
echo "==> [2/5] 修复平台数据目录权限..."
mkdir -p platform-data/uploads \
         platform-data/reports \
         platform-data/recordings \
         platform-data/scripts \
         platform-data/tmp
chmod -R g+rwX,o+rwX platform-data

if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
else
  COMPOSE="docker-compose"
fi

echo "==> [3/5] 构建镜像..."
$COMPOSE -f "$DOCKER_DIR/compose.yaml" build

echo "==> [4/5] 启动/更新容器..."
$COMPOSE -f "$DOCKER_DIR/compose.yaml" up -d --remove-orphans

echo "==> [5/5] 健康检查..."
for attempt in $(seq 1 30); do
  if wget -qO- http://127.0.0.1:3050/api/health >/tmp/qtp-health.json 2>/dev/null; then
    cat /tmp/qtp-health.json
    echo ""
    echo "==> 部署完成：服务已启动并通过健康检查。"
    exit 0
  fi
  sleep 2
done

echo "==> 部署失败：健康检查未通过，输出最近日志。"
$COMPOSE -f "$DOCKER_DIR/compose.yaml" logs --tail=200 qtp
exit 1
