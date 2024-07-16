import { pgTable, serial } from "drizzle-orm/pg-core";

export const example = pgTable("example", {
  id: serial("id").primaryKey(),
});
