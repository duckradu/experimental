import { ComponentProps, Show, splitProps } from "solid-js";
import { type VariantProps, tv } from "tailwind-variants";

import { Icon } from "~/components/ui/icon";

export const buttonVariants = tv({
  base: [
    "inline-flex justify-center items-center",
    "rounded-md",
    "text-sm font-medium leading-relaxed",
    "px-4",
    "disabled-(opacity-50 cursor-not-allowed pointer-events-none)",
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",

      ghost: "bg-transparent text-secondary-foreground hover:bg-secondary",

      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    },
    size: {
      sm: "h-8 px-1.6",
      default: "h-10 gap-1.5 px-3",
      lg: "h-12 gap-2",
      xl: "h-14 gap-3 rounded-lg",
    },
    iconOnly: { true: "aspect-square px-0" },
    loading: { true: "" },
  },
  compoundVariants: [
    {
      size: "sm",
      loading: true,
      class: "text-base",
    },
    {
      size: "default",
      loading: true,
      class: "text-base",
    },
    {
      size: "lg",
      loading: true,
      class: "text-lg",
    },
    {
      size: "xl",
      loading: true,
      class: "text-xl",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

export function Button(originalProps: ButtonProps) {
  const [variantsProps, props] = splitProps(originalProps, [
    "variant",
    "size",
    "iconOnly",
    "loading",
    "class",
  ]);

  return (
    <button
      {...props}
      class={buttonVariants(variantsProps)}
      disabled={props.disabled || variantsProps.loading}
    >
      <Show
        when={!variantsProps.loading}
        fallback={<Icon.spinner class="animate animate-spin" />}
      >
        {props.children}
      </Show>
    </button>
  );
}
