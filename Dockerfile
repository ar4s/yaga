FROM node:19-alpine AS development

WORKDIR /app

RUN npm i -g pnpm

# Files required by pnpm install
COPY package.json pnpm-lock.yaml ./

COPY apps/backend/package.json ./apps/backend/
COPY packages/contract/package.json ./packages/contract/

ADD . ./
RUN pnpm install
RUN pnpm -r --filter=backend... build

RUN pnpm --filter=backend --prod deploy pruned

###################
# PRODUCTION - BACKEND
###################

FROM node:19-alpine AS backend
WORKDIR /app
COPY --chown=node:node --from=development /app/pruned .
COPY --chown=node:node --from=development /app/apps/backend/dist ./dist

CMD [ "node", "dist/main.js" ]
