import { defineConfig } from "@solidjs/start/config";
import devtools from "solid-devtools/vite";
import UnoCSS from "unocss/vite";

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
      UnoCSS(),
    ],
  },
});
