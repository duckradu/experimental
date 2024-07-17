# @sprout/web

## Local setup

### Environment variables

Create a `.env` or `.env.local` and copy the content from `.env.example`, replacing the empty/default values with accurate values. If there are any prepopulated values in `.env.example`, you can use those as defaults locally unless instructed otherwise when reading this document.

### Setting up the local database

> `docker-compose` comes with a `postgres` service with a local persistent volume, and `drizzle-orm` is set up to work with `postgres` (but can be easily changed for another database)

1. Start the docker services

```bash
  docker compose up
```

3. Apply database migrations (if any)

```bash
  pnpm db:migrate
```

4. Seed the database (if applicable)

```bash
  pnpm db:seed
```

> Run `pnpm db:studio` to start `drizzle-studio`.

## Running the monolith

Once you have all the dependencies installed and the docker services are up, run `pnpm run dev` to start the dev server.

### Visit the app

If everything is configured correctly, you should see the app running on [localhost:3000](http://localhost:3000).

## Development

### Manually generate a Database schema barrel import file

When creating new `src/lib/api/**/*.schem.ts` files in development you need to update the schemas barrel import file `(src/lib/db/schema.ts)` to keep the imports neat.

> Run `pnpm generate:schema-barrel` to generate a new `src/lib/db/schema.ts` file.

This command will automatically be triggered by the pre-commit hook.

### Creating an `enum` in drizzle

When creating new `Enum`'s in the drizzle schemas, use the `enum2pg` util like so:

```typescript
import { enum2pg } from "~/lib/utils/db";

export enum SettingsDataType {
  ALPHANUMERIC = "alphanumeric",
  INTEGER = "integer",
}

export const settingDataTypeEnum = pgEnum(
  "settingDataTypeEnum",
  enum2pg(SettingsDataType),
);
```

### Suggested app structure

```
.
└── apps/web/src/
    ├── components/
    │   ├── ui
    │   ├── forms
    │   └── ...
    ├── config/
    │   ├── db.ts
    │   └── app.ts
    ├── lib/
    │   ├── api/
    │   │   └── example/
    │   │       ├── example.schema.ts
    │   │       ├── example.service.ts
    │   │       ├── example.rpc.ts
    │   │       └── example.actions.ts
    │   ├── db
    │   └── utils/
    │       └── db.ts
    ├── migrations
    ├── providers (auth, theme, store context)
    ├── routes
    └── styles
```

### Recommended tools

- [solid-devtools for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/solid-devtools/)
- [unocss extension for VSCode](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)
- [zag.js](https://zagjs.com/) - headless component library
- [tailwind-variants](https://www.tailwind-variants.org) - typesafe & first-class variant API for TailwindCSS (works for UnoCSS as well)
- [unplugin-icons](https://github.com/unplugin/unplugin-icons) is my recommendation for icons
- When dealing with forms & schema validations [`valibot`](https://valibot.dev/) and [`modular-forms`](https://modularforms.dev/) are reliable options