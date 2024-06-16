import { ComponentProps, Show, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export type SettingsSection = ComponentProps<"section">;

export function SettingsSection(props: SettingsSection) {
  return (
    <section
      {...props}
      classList={{
        "relative grid gap-layout": true,
        "@7xl/settings_page:grid-cols-4 [&>header]:col-span-1 [&>div]:col-span-3":
          true,
        [props.class!]: Boolean(props.class?.length),
      }}
    >
      {props.children}
    </section>
  );
}

export type SettingsHeaderProps = Omit<ComponentProps<"header">, "children"> & {
  size?: 1 | 2;

  headingText: string;
  subHeadingText?: string;
};

export function SettingsHeader(originalProps: SettingsHeaderProps) {
  const propsWithDefaults = mergeProps({ size: 1 }, originalProps);
  const [componentProps, headerNodeProps] = splitProps(propsWithDefaults, [
    "size",
    "headingText",
    "subHeadingText",
  ]);

  return (
    <header {...headerNodeProps}>
      <Dynamic
        component={propsWithDefaults.size === 1 ? "h1" : "h2"}
        classList={{
          "text-xl": componentProps.size === 1,
          "text-lg": componentProps.size === 2,
        }}
      >
        {componentProps.headingText}
      </Dynamic>
      <Show when={componentProps.subHeadingText?.length}>
        <small class="text-xs text-muted-foreground">
          {componentProps.subHeadingText}
        </small>
      </Show>
    </header>
  );
}
