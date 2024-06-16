# @kameleon/monolith

## Local setup

### Environment variables

Create a `.env` or `.env.local` and copy the content from `.env.example`, replacing the empty/default values with accurate values. If there are any prepopulated values in `.env.example`, you can use those as defaults locally unless instructed otherwise when reading this document.

### Setting up the local database

1. Start the docker services

```bash
  docker compose up
```

3. Apply database migrations

```bash
  pnpm db:migrate
```

4. Seed the database (Optional)

```bash
  pnpm db:seed
```

> Run `pnpm db:studio` to start `drizzle-studio` with the default config.

## Running the monolith

Once you have all the dependencies installed and the docker services are up, run `pnpm run dev` to start the dev server.

### Visit the app

If everything is configured correctly, visit [localhost:3000](http://localhost:3000) where you should see the Kameleon home page. If you seeded the database, you should be able to use one of the seed accounts to sign in to an actor's profile.

## Development

### Generating a Database schema barrel import file

Remember to update the schemas barrel import file `(src/lib/db/schema.ts)` whenever a new database schema is added to the app `(src/lib/api/**/*.schema.ts)`.

> Run `pnpm db:generate:schema-barrel` to generate a new `src/lib/db/schema.ts` file.

## TODO

- [ ] Add .env validation to prevent app from building
- [ ] Add instructions about env vars when deploying
- [ ] Figure out why local prettier config isn't taken into account
- [ ] Figure out why prettier plugin `importOrder` isn't triggering
- [ ] Add prettier as a devDep & run it on `lint-staged`
- [ ] Add command to typecheck app?