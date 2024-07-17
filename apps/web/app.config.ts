import { defineConfig } from "@solidjs/start/config";
import devtools from "solid-devtools/vite";
import UnoCSS from "unocss/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  vite: {
    plugins: [
      devtools({
        autoname: true,
        locator: {
          targetIDE: "vscode",
          key: "Alt",
          jsxLocation: true,
          componentLocation: true,
        },
      }),
      Icons({
        compiler: "solid",
        customCollections: {
          local: FileSystemIconLoader("./public/icons"),
        },
      }),
      UnoCSS(),
    ],
  },
});
