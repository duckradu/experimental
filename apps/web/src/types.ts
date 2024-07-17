import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import * as schema from "~/lib/db/schema";

export type DBConn =
  | PostgresJsDatabase<typeof schema>
  | PgTransaction<any, typeof schema, any>;

export type NavigationLinkItem<P extends object = {}> = {
  displayText: string;
  href: string;
} & P;

export type NavigationLinkItemWithIcon<P extends object = {}> =
  NavigationLinkItem<P> & { icon: SVGIcon };

export type NavigationLinkItemWithStateIcon<P extends object = {}> =
  NavigationLinkItem<P> & { icon: { active: SVGIcon; inactive: SVGIcon } };
