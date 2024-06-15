import * as avatar from "@zag-js/avatar";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  ComponentProps,
  JSX,
  Show,
  createMemo,
  createUniqueId,
  mergeProps,
  splitProps,
} from "solid-js";
import { VariantProps, tv } from "tailwind-variants";

import { createMergedVariantSlotClasses } from "~/lib/utils/common";

export const avatarVariants = tv({
  slots: {
    root: "relative shrink-0 overflow-hidden rounded-full aspect-square",
    fallback: [
      "aspect-square bg-muted text-muted-foreground rounded-inherit font-semibold",
      "data-[state=visible]-(flex items-center justify-center)",
    ],
    image: "aspect-square object-cover w-full rounded-inherit",
  },
  variants: {
    size: {
      default: {
        root: "w-10",
      },
      profile: {
        root: "w-24",
        fallback: "text-4xl",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface AvatarProps
  extends ComponentProps<"img">,
    VariantProps<typeof avatarVariants>,
    VariantSlotsClassProps<typeof avatarVariants> {
  fallback: JSX.Element;
  displayImage?: boolean;
}

export function Avatar(originalProps: AvatarProps) {
  const props = mergeProps({ displayImage: true }, originalProps);
  const [componentProps, variantProps, imgNodeProps] = splitProps(
    props,
    ["fallback", "displayImage"],
    ["size", "rootClass", "imageClass", "fallbackClass"],
  );

  const [state, send] = useMachine(avatar.machine({ id: createUniqueId() }));

  const api = createMemo(() => avatar.connect(state, send, normalizeProps));

  const mergedVariantSlotClasses = createMergedVariantSlotClasses(
    avatarVariants,
    variantProps,
  );

  return (
    <div class={mergedVariantSlotClasses("root")} {...api().getRootProps()}>
      <span
        class={mergedVariantSlotClasses("fallback")}
        {...api().getFallbackProps()}
      >
        {componentProps.fallback}
      </span>

      <Show when={componentProps.displayImage}>
        <img
          {...api().getImageProps()}
          {...imgNodeProps}
          class={mergedVariantSlotClasses("image", imgNodeProps.class)}
        />
      </Show>
    </div>
  );
}
