FROM node:22

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/dashboard/package.json apps/dashboard/package.json
COPY packages/core/package.json packages/core/package.json
COPY packages/db/package.json packages/db/package.json


RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm packages:build
RUN pnpm dashboard:build

CMD ["pnpm", "--filter", "@genesis/dashboard", "start"]
