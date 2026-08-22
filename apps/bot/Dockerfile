FROM node:22

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/bot/package.json apps/bot/package.json
COPY packages/core/package.json packages/core/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/services/package.json packages/services/package.json

RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm packages:build
RUN pnpm bot:build

CMD ["pnpm", "--filter", "@genesis/bot", "start"]
