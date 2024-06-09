import { ParentProps } from "solid-js";

import { AppFooter } from "~/components/app-footer";
import { SquigglesBackground } from "~/components/squiggles-background";

export type CentralFocusLayoutProps = ParentProps;

export function SquigglesCentralFocusLayout(props: CentralFocusLayoutProps) {
  return (
    <>
      <SquigglesBackground />

      <div class="flex flex-col h-screen p-4">
        <div class="flex items-center justify-center grow-1">
          {props.children}
        </div>

        <div class="max-w-sm mx-auto text-center">
          <AppFooter />
        </div>
      </div>
    </>
  );
}
