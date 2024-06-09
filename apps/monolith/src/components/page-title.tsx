import { Title } from "@solidjs/meta";
import { ParentProps } from "solid-js";

export type PageTitleProps = ParentProps;

export function PageTitle(props: PageTitleProps) {
  const title = () =>
    [props.children, "kameleon.social"].filter(Boolean).join(" / ");

  return <Title>{title()}</Title>;
}
