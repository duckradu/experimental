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
          name: "Public Sans",
          weights: ["400", "500", "600", "700", "800", "900"],
        },
      },
    }),
    presetAnimations(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",

      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },

      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },

      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },

      brand: {
        DEFAULT: "hsl(var(--brand))",
        foreground: "hsl(var(--brand-foreground))",
      },

      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },

      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },

      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
    },
    borderRadius: {
      sm: "calc(var(--radius) - 4px)",
      md: "calc(var(--radius) - 2px)",
      lg: "var(--radius)",
      xl: "calc(var(--radius) + 2px)",
      "2xl": "calc(var(--radius) + 4px)",
    },
  },
  rules: [
    [
      /^p(x|y|r|l|t|b)?-layout$/,
      ([, dir], { theme }) => {
        switch (dir) {
          case "x":
            return {
              "padding-left": theme.spacing.xs,
              "padding-right": theme.spacing.xs,
            };
          case "y":
            return {
              "padding-top": theme.spacing.xs,
              "padding-bottom": theme.spacing.xs,
            };
          case "r":
            return {
              "padding-right": theme.spacing.xs,
            };
          case "l":
            return {
              "padding-left": theme.spacing.xs,
            };
          case "t":
            return {
              "padding-top": theme.spacing.xs,
            };
          case "b":
            return {
              "padding-bottom": theme.spacing.xs,
            };
          default:
            return { padding: theme.spacing.xs };
        }
      },
    ],
    [
      /^gap(-(x|y|col|row))?-layout$/,
      ([, dir], { theme }) => {
        if (["-x", "-col"].includes(dir)) {
          return { "column-gap": theme.spacing.xs };
        }
        if (["-y", "-row"].includes(dir)) {
          return { "row-gap": theme.spacing.xs };
        }

        return { gap: theme.spacing.xs };
      },
    ],
  ],
});
