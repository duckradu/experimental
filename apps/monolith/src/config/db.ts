import { type Config } from "drizzle-kit";

export default {
  out: "./src/migrations",
  dialect: "postgresql",
  schema: "./src/lib/api/**/*.schema.ts",
  dbCredentials: {
    url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.POSTGRES_DB}`,
  },
  verbose: true,
  strict: true,
} satisfies Config;
