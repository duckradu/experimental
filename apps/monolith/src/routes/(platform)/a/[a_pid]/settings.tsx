import { A, RouteSectionProps, useLocation } from "@solidjs/router";
import { For } from "solid-js";

import { SettingsHeader } from "~/components/settings";
import { Separator } from "~/components/ui/separator";

import { useAuth } from "~/providers/authentication";

import { paths } from "~/lib/paths";

export type SettingsLayoutProps = RouteSectionProps;

export default function SettingsLayout(props: SettingsLayoutProps) {
  const location = useLocation();

  const isRootPath = () => /settings\/?$/.test(location.pathname);

  return (
    <div class="@container/settings flex gap-layout min-h-screen">
      <aside
        classList={{
          "@container/nav relative": true,
          "w-full flex-col gap-layout shrink-0": true,
          "@2xl/settings-(w-full max-w-64)": true,

          flex: isRootPath(),
          "hidden @2xl/settings:flex": !isRootPath(),
        }}
      >
        <div class="sticky top-0 left-0 right-0">
          <div class="grid gap-layout py-layout">
            <SettingsHeader headingText="Settings" />

            <Separator />

            <nav class="grid gap-1">
              <For each={useSettingsNavigationItems()}>
                {(item) => (
                  <A
                    href={item.href}
                    class="inline-flex hover:bg-muted @xl/nav:text-base text-sm p-2 rounded w-full"
                    activeClass="bg-muted font-semibold"
                  >
                    {item.displayText}
                  </A>
                )}
              </For>
            </nav>
          </div>
        </div>
      </aside>

      <div
        classList={{
          "w-full": true,

          "hidden @2xl/settings:block": isRootPath(),
        }}
      >
        <div class="py-layout">
          <div class="@container/settings_page flex flex-col gap-layout">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

function useSettingsNavigationItems(): NavigationLinkItem[] {
  const { actor } = useAuth();

  const result: NavigationLinkItem[] = [];

  // :(
  const actorValue = actor();

  if (actorValue) {
    result.push({
      displayText: "Appearance",
      href: paths.actor(actorValue.pid).settings.appearance,
    });
  }

  return result;
}
