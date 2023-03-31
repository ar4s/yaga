# YAGA - Yet Anothe Github App
The goal of this project is to create a Github App that can be used to search repo and simply display table of results.

# Development

## Prerequisite
Make sure you have the following installed:
- nvm - (recommended) - for managing node versions
- Node.js - v19
- pnpm - v8

## How to run
1. Clone the repo
2. Run `pnpm install`
3. Run `docker compose up -d` (or `docker-compose up -d`)
3. Run `pnpm dev`

# Architecture

# Mini Architecture Decision Records
## Frontend and backend apps
I decided to split the app into two apps:
- frontend - Next.js
- backend - Nest.js
The main reason for this is to separate the frontend and backend concerns.
This will make it easier to scale and maintain the app.

## pnpm
I familiar with pnpm and I like it because it is fast and it has a lot of features, like:
 - `pnpm deploy` to create a production dependencies
 - `pnpm --filter '<package>...'` to build only specific package and its dependencies


## Next.js
I chose Next.js because it is a framework that I am familiar with and it is easy to get started with. It also has a lot of features that I can use to speed up development:
  - SSR - I can use this to improve SEO and performance (caching on the edge)
  - routing - I can use this to create nice URLs
  - API routes - I can use this to create API endpoints

## Nest.js

## Docker
