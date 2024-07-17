"use server";

import { eq } from "drizzle-orm";
import { useSession } from "vinxi/http";

import { db } from "~/lib/db";
import { actors } from "~/lib/db/schema";

import { sessionConfig } from "~/config/app";

export function getSession() {
  return useSession<{ actorId: (typeof actors.$inferInsert)["id"] }>(
    sessionConfig,
  );
}

export async function getSessionActor() {
  const session = await getSession();

  const actorId = session.data.actorId;

  if (actorId == null) {
    return null;
  }

  return (
    (await db.query.actors.findFirst({
      where: () => eq(actors.id, actorId),
    })) || null
  );
}
