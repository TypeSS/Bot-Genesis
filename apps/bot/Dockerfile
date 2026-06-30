FROM node:22

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app


COPY . .

RUN pnpm install

RUN pnpm --filter @genesis/bot build

CMD ["pnpm", "--filter", "@genesis/bot", "start"]
