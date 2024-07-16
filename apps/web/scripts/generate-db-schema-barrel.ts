import { writeFile } from "fs/promises";
import { glob } from "glob";

import config from "~/config/db";

const outPath = "./src/lib/db/schema.ts";
const schemaFiles = await glob(config.schema);

const fileContent = [
  "// Update the code in `./scripts/generate-db-schema-barrel.ts`",
  "// and run it again if you want to change the generated output.\n",

  ...schemaFiles.map((schemaPath) => {
    const importPath = schemaPath.replace("src", "~").replace(".ts", "");

    return `export * from "${importPath}";`;
  }),
]
  .join("\n")
  .concat("\n");

await writeFile(outPath, fileContent);
