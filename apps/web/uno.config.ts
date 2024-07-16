import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: {
          name: "Noto Sans",
          weights: ["400"],
        },
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
