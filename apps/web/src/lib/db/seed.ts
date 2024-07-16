import { emptyTables } from "~/lib/utils/db";

(async function seed() {
  await emptyTables();

  // Seed your tables here

  process.exit(0);
})();
