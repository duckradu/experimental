import { emptyTables } from "~/lib/utils/db";

(async function seed() {
  await emptyTables();

  process.exit(0);
})();
