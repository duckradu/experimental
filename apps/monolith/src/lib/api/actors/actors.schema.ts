import {
  boolean,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { nanoid } from "~/lib/utils/common";

export const actors = pgTable(
  "actors",
  {
    id: serial("id").primaryKey(),
    pid: varchar("pid").notNull().unique().$defaultFn(nanoid),

    email: varchar("email").notNull().unique(),
    encryptedPassword: varchar("encrypted_password").notNull(),

    // TODO: Move to `identities` eventually
    name: varchar("name", { length: 255 }),
    note: text("note"),
    externalUrl: text("external_url"),

    dob: timestamp("dob", { mode: "string", withTimezone: true }),

    onboardingInProgress: boolean("onboarding_in_progress")
      .notNull()
      .default(true),

    // emailConfirmationSentAt: timestamp("email_confirmation_sent_at", {
    //   mode: "string",
    //   withTimezone: true,
    // }),
    // emailConfirmedAt: timestamp("email_confirmed_at", {
    //   mode: "string",
    //   withTimezone: true,
    // }),
    // passwordExpiresAt: timestamp("password_expires_at", {
    //   mode: "string",
    //   withTimezone: true,
    // }),

    createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
  },
  (table) => ({
    indexActorsOnPid: index("index_actors_on_pid").on(table.pid),
  }),
);
