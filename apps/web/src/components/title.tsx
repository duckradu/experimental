import { Title as BaseTitle } from "@solidjs/meta";
import { mergeProps, ParentProps } from "solid-js";

import { appConfig } from "~/config/app";

export type TitleProps = ParentProps<{ prepend?: string }>;

export function Title(originalProps: TitleProps) {
  const props = mergeProps({ prepend: appConfig.name }, originalProps);

  const title = () =>
    [originalProps.children, props.prepend].filter(Boolean).join(" / ");

  return <BaseTitle>{title()}</BaseTitle>;
}
