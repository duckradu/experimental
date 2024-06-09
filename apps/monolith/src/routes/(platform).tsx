import { A, RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";

import { AppFooter } from "~/components/app-footer";
import { Icon } from "~/components/ui/icon";

import { useAuth } from "~/context/authentication";

export type PlatformLayoutProps = RouteSectionProps;

export default function PlatformLayout(props: PlatformLayoutProps) {
  const { actor } = useAuth();

  return (
    <div
      classList={{
        flex: true,

        "[&:>first-child]:ml-auto [&>:last-child]:mr-auto": true,

        "[&>aside]-(px-layout relative shrink-0 z-10)": true,
        "[&>aside>div]-(sticky top-0 w-full h-screen)": true,
        "[&>aside>div>div]-(flex flex-col h-screen py-layout)": true,
        "[&>aside>div>div>div]-(flex flex-col grow-1 justify-between gap-2)":
          true,

        "[&>div>div]:px-layout": true,
      }}
    >
      <aside class="w-64">
        <div>
          <div>
            <A
              href="/"
              class="flex justify-center items-center gap-3 px-3 pt-1 pb-2 w-13 h-13 hover:bg-muted rounded-full"
            >
              <Icon.logo.solid class="w-7 h-7 shrink-0" />
            </A>

            <div>Nav items</div>
          </div>
        </div>
      </aside>

      {/* Alternate between w-2xl and w-full */}
      <div class="w-full">
        <div class="w-full max-w-2xl min-h-screen mx-auto">
          {props.children}
        </div>
      </div>

      <aside class="w-74">
        <div>
          <div>
            <div>
              <AppFooter />
            </div>

            <Show when={actor()}>CREATE NEW POST</Show>
          </div>
        </div>
      </aside>
    </div>
  );
}
