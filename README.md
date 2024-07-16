# Sprout

Sprout is a boilerplate monorepo build using `pnpm`.

## Local setup

### Global dependencies

- [nodejs](https://nodejs.org/) (>= 20)
- [pnpm](https://pnpm.io/installation)
- [docker-compose](https://www.docker.com/)

### Install monorepo dependencies

Run `pnpm install` at the root of the monorepo (where this README.md is located).

### This monorepo has the following tools installed:

- [husky](https://typicode.github.io/husky/) with a `pre-commit` hook with some basic config
- [lint-staged](https://github.com/lint-staged/lint-staged) - should be configured for each individual project inside `/apps`

> There's a `preinstall` script that will only allow `pnpm` since this is a pnpm monorepo.

### Commands

- `build:web` & `start:web` are available when deploying the monorepo. Note that the `build:web` command will also apply database migrations when run.

### TODO
- [ ] Config prettier & setup import order plugin