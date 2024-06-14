"use server";

import { useSession } from "vinxi/http";

import { actors } from "~/lib/db/schema";

import * as ActorsService from "~/lib/api/actors/actors.service";

import { sessionConfig } from "~/config/monolith";

export function getSession() {
  return useSession<{ actorId: (typeof actors.$inferInsert)["id"] }>(
    sessionConfig,
  );
}

export async function getSessionActor() {
  const session = await getSession();

  const actorId = session.data.actorId;

  if (!actorId) {
    return null;
  }

  return (await ActorsService.findById(actorId)) || null;
}
