import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetAnimations from "unocss-preset-animations";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: {
          name: "Noto Sans",
          weights: ["400", "500", "600", "700", "800", "900"],
        },
        // logo: "Lakki Reddy",
        // logo: "Aladin",
        // logo: "Dokdo",
        // logo: "East Sea Dokdo",
      },
    }),
    presetAnimations(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
