import * as argon2 from "argon2";

import { db } from "~/lib/db";
import { actors } from "~/lib/db/schema";

import { emptyTables } from "~/lib/utils/db";

import { INITIAL_ACTOR } from "~/config/app";

(async function seed() {
  await emptyTables();

  await db
    .insert(actors)
    .values({
      id: 0,
      pid: INITIAL_ACTOR.pid,

      name: "Test Account",
      externalUrl: "https://kameleon.social",
      // dob:

      email: "test@kameleon.social",
      encryptedPassword: await argon2.hash("password"),
    })
    .returning();

  process.exit(0);
})();
