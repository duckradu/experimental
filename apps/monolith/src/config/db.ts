import { type Config } from "drizzle-kit";

const config = {
  out: "./src/migrations",
  dialect: "postgresql",
  schema: "./src/lib/api/**/*.schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // :(
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
console.log(process.env.DATABASE_URL);

export default config;
