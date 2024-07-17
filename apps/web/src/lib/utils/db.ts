import { sql } from "drizzle-orm";

import { db } from "~/lib/db";

export async function emptyTables() {
  "use server";

  const query = sql<string>`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `;

  const tables = await db.execute(query);

  for (let table of tables) {
    const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
    await db.execute(query);
  }
}

// Thanks to https://github.com/drizzle-team/drizzle-orm/discussions/1914#discussioncomment-9600199
export function enum2pg<T extends Record<string, any>>(
  arg_enum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(arg_enum).map((v: any) => `${v}`) as any;
}
