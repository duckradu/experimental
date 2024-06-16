import { type Config } from "drizzle-kit";

const config = {
  out: "./src/migrations",
  dialect: "postgresql",
  schema: "./src/lib/api/**/*.schema.ts",
  dbCredentials: {
    url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.POSTGRES_DB}`,
  },
  verbose: true,
  strict: true,
} satisfies Config;

console.log("=====================================");
console.log("DB URL:", config.dbCredentials);
console.log("=====================================");
console.log("ENV:", process.env.POSTGRES_USER);
console.log("ENV:", process.env);
console.log("=====================================");

export default config;
