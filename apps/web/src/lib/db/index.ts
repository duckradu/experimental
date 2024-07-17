import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "~/lib/db/schema";

import config from "~/config/db";

const queryClient = postgres(config.dbCredentials.url);

export const db = drizzle(queryClient, { schema });
