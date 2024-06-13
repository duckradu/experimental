import { A as BaseA, useLocation } from "@solidjs/router";
import { Accessor, ComponentProps, JSXElement, splitProps } from "solid-js";

export type AWithStateProps = {
  children: (props: { isActive: Accessor<boolean> }) => JSXElement;
} & Omit<ComponentProps<typeof BaseA>, "children">;

export function AWithState(props: AWithStateProps) {
  const [, rest] = splitProps(props, ["children"]);
  const location = useLocation();

  const isActive = () =>
    Boolean(rest.end)
      ? location.pathname === rest.href
      : location.pathname.includes(rest.href);

  return <BaseA {...rest}>{props.children({ isActive })}</BaseA>;
}
