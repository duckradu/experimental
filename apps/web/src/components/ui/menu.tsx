import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  ComponentProps,
  For,
  JSX,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  createUniqueId,
  mergeProps,
  splitProps,
} from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
import { ClassValue, VariantProps, tv } from "tailwind-variants";

import { AWithState, AWithStateProps } from "~/components/a-with-state";

import { createMergedVariantSlotClasses } from "~/lib/utils/common";

export const menuVariants = tv({
  slots: {
    positioner: "w-full z-40",
    content: [
      "border border-border",
      "bg-popover/60 backdrop-blur-xl",
      "text-ellipsis overflow-hidden z-40",
    ],
    listItem: "group",
    item: [
      "w-full p-2.5",
      "flex items-center",
      "bg-transparent text-popover-foreground text-base",
      "hover:bg-popover-foreground/5 focus:bg-popover-foreground/5 group-data-[highlighted]-bg-popover-foreground/5",
      "[&.active>svg]:text-accent",
      "aria-disabled-(pointer-events-none opacity-50)",
    ],
  },
  variants: {
    containerSize: {
      default: {
        positioner: "max-w-[12rem]",
      },
      full: {},
    },
    itemSize: {
      default: {
        content: "rounded-xl",
        item: "gap-2 [&>svg]-(w-5.5 h-5.5)",
      },
      "2xl": {
        content: "rounded-2xl",
        item: "gap-3 py-3 [&>svg]-(w-7 h-7)",
      },
    },
  },
  defaultVariants: {
    containerSize: "default",
    itemSize: "default",
  },
});

export type MenuItemCommonProps = {
  displayText: string;
  icon: SVGIcon | { active: SVGIcon; inactive: SVGIcon };
  iconProps?: ComponentProps<SVGIcon>;
};

export type MenuItem = MenuItemCommonProps &
  (
    | {
        anchorProps: Omit<AWithStateProps, "children">;
        buttonProps?: never;
        component?: never;
      }
    | {
        anchorProps?: never;
        buttonProps: Omit<ComponentProps<"button">, "children">;
        component?: never;
      }
    | {
        anchorProps?: never;
        buttonProps?: never;
        component: (
          props: MenuItemCommonProps &
            menu.ItemProps & {
              itemClassAccessor: Accessor<ClassValue>;
            },
        ) => JSX.Element;
      }
  );

export type MenuProps = {
  trigger: (args: {
    getTriggerProps: menu.Api["getTriggerProps"];
  }) => JSX.Element;
  items: Accessor<(Partial<menu.ItemProps> & MenuItem)[]>;

  machineOptions?: Omit<menu.Context, "id">;

  portal?: boolean;
  portalProps?: ComponentProps<typeof Portal>;
} & VariantProps<typeof menuVariants> &
  VariantSlotsClassProps<typeof menuVariants>;

export function Menu(originalProps: MenuProps) {
  const machineOptions = createMemo(() =>
    mergeProps(
      { positioning: { offset: { mainAxis: 8 } }, loopFocus: true },
      originalProps.machineOptions,
    ),
  );

  const [state, send] = useMachine(
    menu.machine({ id: createUniqueId(), ...machineOptions() }),
  );

  const api = createMemo(() => menu.connect(state, send, normalizeProps));

  createEffect(() => {
    // * This is a workaround and it's not ideal because the effect runs more
    // * than once. Need to find a better solution
    if (api().open) {
      api().reposition();
    }
  });

  const [componentProps, variantProps] = splitProps(originalProps, [
    "trigger",
    "items",
    "machineOptions",
    "portal",
    "portalProps",
  ]);

  const mergedVariantSlotClasses = createMergedVariantSlotClasses(
    menuVariants,
    variantProps,
  );

  const content = () => {
    return (
      <div
        class={mergedVariantSlotClasses("positioner")}
        {...api().getPositionerProps()}
      >
        <ul
          class={mergedVariantSlotClasses("content")}
          {...api().getContentProps()}
        >
          <For each={componentProps.items()}>
            {(originalItem) => {
              const item: menu.ItemProps & MenuItem = {
                value: originalItem.value || createUniqueId(),
                ...originalItem,
              };

              return (
                <li class={mergedVariantSlotClasses("listItem")}>
                  <Switch>
                    <Match when={item.anchorProps}>
                      <AWithState
                        {...api().getItemProps(item)}
                        {...item.anchorProps!}
                        class={mergedVariantSlotClasses(
                          "item",
                          item.anchorProps!.class,
                        )}
                      >
                        {({ isActive }) => (
                          <>
                            <MenuItemIcon
                              icon={item.icon}
                              isActive={isActive}
                              {...item.iconProps}
                            />
                            <span>{item.displayText}</span>
                          </>
                        )}
                      </AWithState>
                    </Match>
                    <Match when={item.buttonProps}>
                      <button
                        {...api().getItemProps(item)}
                        {...item.buttonProps}
                        class={mergedVariantSlotClasses(
                          "item",
                          item.buttonProps!.class,
                        )}
                        disabled={item.disabled}
                      >
                        <MenuItemIcon icon={item.icon} {...item.iconProps} />
                        <span>{item.displayText}</span>
                      </button>
                    </Match>
                    <Match when={item.component}>
                      {item.component!({
                        ...api().getItemProps(item),
                        ...item,
                        itemClassAccessor: () =>
                          mergedVariantSlotClasses("item"),
                      })}
                    </Match>
                  </Switch>
                </li>
              );
            }}
          </For>
        </ul>
      </div>
    );
  };

  return (
    <>
      {componentProps.trigger({ getTriggerProps: api().getTriggerProps })}

      <Show
        when={componentProps.portal || componentProps.portalProps}
        fallback={content()}
      >
        <Portal {...componentProps.portalProps}>{content()}</Portal>
      </Show>
    </>
  );
}

export type MenuItemIconProps = Pick<MenuItemCommonProps, "icon"> &
  ComponentProps<SVGIcon> & { isActive?: Accessor<boolean> };

export function MenuItemIcon(originalProps: MenuItemIconProps) {
  const [{ icon, isActive }, props] = splitProps(originalProps, [
    "icon",
    "isActive",
  ]);

  if (typeof icon === "function") {
    const Icon = icon;

    return <Icon {...props} />;
  }

  const Icon = icon;

  return (
    <Dynamic
      component={isActive?.() ? Icon.active : Icon.inactive}
      {...props}
    />
  );
}
