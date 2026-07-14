FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache \
    ca-certificates \
    chromium \
    ffmpeg \
    font-noto-cjk \
    freetype \
    harfbuzz \
    nss \
    xvfb \
    xvfb-run

ENV NODE_ENV=production \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    DISPLAY=:99

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --include=dev
RUN FFMPEG_REVISION="$(node -e "const data = require('./node_modules/playwright-core/browsers.json'); process.stdout.write(data.browsers.find((browser) => browser.name === 'ffmpeg').revision)")" \
    && mkdir -p "/home/node/.cache/ms-playwright/ffmpeg-${FFMPEG_REVISION}" \
    && ln -s /usr/bin/ffmpeg "/home/node/.cache/ms-playwright/ffmpeg-${FFMPEG_REVISION}/ffmpeg-linux" \
    && chown -R node:node /home/node/.cache

COPY --chown=node:node . .
RUN npm run build:web
RUN mkdir -p /app/test-results && chown -R node:node /app/test-results

# 提前在镜像里建好平台数据子目录并授权给 node，这样即使宿主机以 root
# 身份创建并挂载了 /app/platform-data，容器内非 root 的 node 用户也能
# 正常写入 uploads/reports/recordings/scripts 等子目录。
RUN mkdir -p /app/platform-data/uploads \
         /app/platform-data/reports \
         /app/platform-data/recordings \
         /app/platform-data/scripts \
         /app/platform-data/tmp \
    && chown -R node:node /app/platform-data

USER node

EXPOSE 3050

CMD ["sh", "-c", "Xvfb :99 -screen 0 1440x900x24 -nolisten tcp >/tmp/xvfb.log 2>&1 & exec node server/index.mjs"]
