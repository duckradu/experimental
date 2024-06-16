import { type Config } from "drizzle-kit";
import { expand } from "dotenv-expand";
import dotenv from "dotenv";

expand(dotenv.config());

export default {
  out: "./src/migrations",
  dialect: "postgresql",
  schema: "./src/lib/api/**/*.schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // :(
  },
  verbose: true,
  strict: true,
} satisfies Config;
