# Bot Genesis

> [!IMPORTANT]
> O bot ainda está numa fase inicial, pelo que pode apresentar alguns bugs inesperados. Se não estiver nos [Bugs Conhecidos](#bugs-conhecidos), abre um [issue](https://github.com/TypeSS/Bot-Genesis/issues)!

Um bot multi-funções feito para o servidor [Genesis Portugal](https://discord.gg/5urQJ7GW7W), com o intuito de substituir bots pagos.

---

## Bugs Conhecidos

Lista de bugs de que já temos conhecimento e estamos ativamente a trabalhar para resolver. Procura aqui antes de abrires um [issue](https://github.com/TypeSS/Bot-Genesis/issues).

- [Valores de XP negativos](https://github.com/TypeSS/Bot-Genesis/issues/4)

---

## Funcionalidades

- Sistema de níveis através de sessões
- Migração parcial de níveis de outros bots
- ...

---
## Funcionalidades em Desenvolvimento

- [Comando de leaderboard](https://github.com/TypeSS/Bot-Genesis/issues/6)
---

## Stack Tecnológica

- Node.js
- TypeScript
- discord.js
- SQLite

---

## Instalação

```bash
git clone git@github.com:TypeSS/Bot-Genesis.git
cd Bot-Genesis
npm install
```

---

## Configuração

Cria um ficheiro `.env` no diretório `src`:

```bash
TOKEN=o_teu_token
```

---

## Executar

Podes iniciar o bot de duas formas diferentes:

### Docker (RECOMENDADO)

Esta é a maneira recomendada de executar o bot:

```bash
docker compose up
```

Pode ser necessário instalar o [Docker](https://docs.docker.com/get-started/get-docker/) na máquina.

### Desenvolvimento

Para desenvolver o bot, recomendamos usar:

```bash
npm run dev # para iniciar o bot
npm run previewCard # para pré-visualizar o card de nível
```

---

## CI/CD (GitHub Actions)

O repositório agora inclui:

- `CI` (`.github/workflows/ci.yml`): instala dependências, compila packages, bot e dashboard, faz typecheck/lint e valida `docker compose build`.
- `CD` (`.github/workflows/cd.yml`): faz deploy automático para produção quando o `CI` termina com sucesso em `main` (ou manualmente via `workflow_dispatch`).

### Secrets necessários (Environment `production`)

- `TS_OAUTH_CLIENT_ID` (OAuth client ID da tailnet para o GitHub Actions runner)
- `TS_OAUTH_SECRET` (OAuth secret da tailnet para o GitHub Actions runner)
- `SSH_HOST` (IP `100.x.y.z` ou MagicDNS do servidor na tailnet)
- `SSH_PORT` (opcional, default `22`)
- `SSH_USER` (utilizador SSH)
- `SSH_PRIVATE_KEY` (chave privada para deploy)
- `DEPLOY_PATH` (diretório no servidor onde o repo vai ficar)

### Pré-requisitos no servidor

- Docker + Docker Compose instalados
- Tailscale instalado e autenticado na mesma tailnet
- Ficheiro `.env` criado no `DEPLOY_PATH` com as variáveis necessárias
- Porta `3000` aberta/proxy configurado (dashboard)

---

## Contribuir

Podes ajudar o desenvolvimento do bot da Genesis encontrando ou resolvendo [problemas](https://github.com/TypeSS/Bot-Genesis/issues), [desenvolvendo](https://github.com/TypeSS/Bot-Genesis/pulls) novas funcionalidades, ou doando à equipa. Obrigado por considerares ajudar!

---

<sub> Feito pela equipa de desenvolvimento da Genesis Portugal, com ♥ </sub>
