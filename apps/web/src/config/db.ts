import dotenv from "dotenv";
import { expand } from "dotenv-expand";
import { type Config } from "drizzle-kit";

expand(dotenv.config());

export default {
  out: "./src/migrations",
  dialect: "postgresql",
  schema: "./src/lib/api/**/*.schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // TODO: Add schema validation for .env
  },
  verbose: true,
  strict: true,
} satisfies Config;
