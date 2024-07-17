import {
  FieldElementProps,
  FieldPath,
  FieldStore,
  FieldValues,
} from "@modular-forms/solid";
import { ComponentProps, JSX, ParentProps, Show, splitProps } from "solid-js";
import { type VariantProps, tv } from "tailwind-variants";

import { Icon } from "~/components/ui/icon";

export type FormItemProps = ParentProps;

export function FormItem(props: FormItemProps) {
  return <div class="grid gap-1">{props.children}</div>;
}

export type FormItemErrorMessageProps = ParentProps;

export function FormItemErrorMessage(props: FormItemErrorMessageProps) {
  return (
    <p class="flex items-center gap-1 text-sm font-medium text-destructive">
      <Icon.danger.triangle.bold />
      <span>{props.children}</span>
    </p>
  );
}

export function renderField<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>(
  renderFn: (
    store: FieldStore<TFieldValues, TFieldName>,
    props: FieldElementProps<TFieldValues, TFieldName>,
  ) => JSX.Element,
) {
  return (
    store: FieldStore<TFieldValues, TFieldName>,
    props: FieldElementProps<TFieldValues, TFieldName>,
  ) => (
    <FormItem>
      {renderFn(store, props)}

      <Show when={store.error}>
        <FormItemErrorMessage>{store.error}</FormItemErrorMessage>
      </Show>
    </FormItem>
  );
}

export const inputVariants = tv({
  base: [
    "flex",
    "bg-input",
    "border border-input rounded-md",
    "text-sm",
    "px-4",
    "placeholder:text-muted-foreground",
    "disabled:(cursor-not-allowed opacity-50)",
  ],
  variants: {
    size: {
      default: "h-10",
      lg: "h-12",
      xl: "h-14 rounded-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface InputProps
  extends Omit<ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

export function Input(originalProps: InputProps) {
  const [, props] = splitProps(originalProps, ["children"]);

  return (
    <input id={props.name} {...originalProps} class={inputVariants(props)} />
  );
}
