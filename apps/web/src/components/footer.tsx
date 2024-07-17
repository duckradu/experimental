import { A } from "@solidjs/router";
import { format } from "date-fns/format";
import { For, Show } from "solid-js";

import { appConfig } from "~/config/app";

export function Footer() {
  const navigationItems = useFooterNavigationItems();

  return (
    <footer class="text-xs text-muted-foreground space-y-2">
      <nav class="flex flex-wrap gap-1 p-3 bg-muted rounded-md">
        <For each={navigationItems}>
          {(item, i) => (
            <>
              <A href={item.href} class="hover:underline underline-offset-3">
                {item.displayText}
              </A>
              <Show when={i() !== navigationItems.length - 1}>&middot;</Show>
            </>
          )}
        </For>
      </nav>

      <p>
        {["©", format(new Date(), "yyyy"), appConfig.name, " "].join(" ")}
        {/* TODO: Replace with app version */}
        <small>(v0.0.0)</small>
      </p>
    </footer>
  );
}

function useFooterNavigationItems() {
  return [
    {
      displayText: "About us",
      href: "/about-us",
    },
    {
      displayText: "Terms & Privacy",
      href: "/terms-and-privacy",
    },
    {
      displayText: "Help",
      href: "/help",
    },
    {
      displayText: "Send feedback",
      href: "/send-feedback",
    },
  ];
}
