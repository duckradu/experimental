import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { nanoid } from "~/lib/utils/common";

export const actors = pgTable("actors", {
  id: serial("id").primaryKey(),
  pid: varchar("pid").notNull().unique().$defaultFn(nanoid),
});
