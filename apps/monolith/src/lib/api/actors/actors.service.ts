"use server";

import { eq } from "drizzle-orm";

import { db } from "~/lib/db";
import { actors } from "~/lib/db/schema";

export function findById(id: (typeof actors.$inferSelect)["id"]) {
  return db.query.actors.findFirst({ where: () => eq(actors.id, id) });
}

export function findByPublicId(pid: (typeof actors.$inferSelect)["pid"]) {
  return db.query.actors.findFirst({ where: () => eq(actors.pid, pid) });
}
