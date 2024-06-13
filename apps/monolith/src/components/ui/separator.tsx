import { JSX, mergeProps } from "solid-js";

export interface SeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator(originalProps: SeparatorProps) {
  const props = mergeProps(
    {
      orientation: "horizontal",
    },
    originalProps,
  );

  return (
    <div
      {...props}
      classList={{
        "shrink-0 bg-border": true,

        "w-full h-px": props.orientation === "horizontal",
        "w-px h-full": props.orientation !== "horizontal",

        [props.class!]: Boolean(props.class),
      }}
    ></div>
  );
}
