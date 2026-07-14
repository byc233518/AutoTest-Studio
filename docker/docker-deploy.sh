#!/bin/sh
# JMOM 自动化测试平台 - 目标服务器一键打包更新脚本
# 用途：在目标服务器上拉取代码后进入本目录执行即可完成打包与运行。
# 调用示例（Jenkins Publish over SSH 远程执行）：
#   cd /data2/QTP && sh docker/docker-deploy.sh

set -eu

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCKER_DIR="$(dirname "$0")"

cd "$PROJECT_DIR"

echo "==> [1/4] 代码目录就绪: $PROJECT_DIR"

if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
else
  COMPOSE="docker-compose"
fi

echo "==> [2/4] 构建镜像..."
$COMPOSE -f "$DOCKER_DIR/compose.yaml" build

echo "==> [3/4] 启动/更新容器..."
$COMPOSE -f "$DOCKER_DIR/compose.yaml" up -d --remove-orphans

echo "==> [4/4] 健康检查..."
for attempt in $(seq 1 30); do
  if wget -qO- http://127.0.0.1:3050/api/health >/tmp/qtp-health.json 2>/dev/null; then
    cat /tmp/qtp-health.json
    echo ""
    echo "==> 部署完成: 服务已启动并通过健康检查。"
    exit 0
  fi
  sleep 2
done

echo "==> 部署失败: 健康检查未通过，输出最近日志。"
$COMPOSE -f "$DOCKER_DIR/compose.yaml" logs --tail=200 qtp
exit 1
