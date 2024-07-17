import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import * as schema from "~/lib/db/schema";

export type DBConn =
  | PostgresJsDatabase<typeof schema>
  | PgTransaction<any, typeof schema, any>;
