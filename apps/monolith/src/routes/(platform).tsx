import { A, RouteSectionProps, action, useAction } from "@solidjs/router";
import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import { AWithState } from "~/components/a-with-state";
import { AppFooter } from "~/components/app-footer";
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/ui/icon";

import { useAuth } from "~/providers/authentication";

import * as AuthenticationService from "~/lib/api/authentication/authentication.service";

const signOutAction = action(async () => {
  "use server";

  const session = await AuthenticationService.getSession();

  await session.update({ actorId: undefined });
}, "authentication:sign-out");

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
              <Icon.logo.bold class="w-7 h-7 shrink-0" />
            </A>

            <div>
              <PrimaryNavigation />

              <Show when={actor()} fallback={<AuthNavigation />}>
                {(() => {
                  const triggerAction = useAction(signOutAction);

                  return (
                    <nav>
                      <ul>
                        <li>
                          <Button onClick={triggerAction}>Sign out</Button>
                        </li>
                      </ul>
                    </nav>
                  );
                })()}
              </Show>
            </div>
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

              <Show when={actor()}>CREATE NEW POST</Show>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function PrimaryNavigation() {
  return (
    <nav class="grid group/primary-nav">
      <For each={usePrimaryNavigationItems()}>
        {(item) => <NavigationItem {...item} />}
      </For>
    </nav>
  );
}

function usePrimaryNavigationItems(): NavigationLinkItemWithStateIcon[] {
  return [
    {
      displayText: "Home",
      href: "/",
      icon: {
        active: Icon.home.smile.bold,
        inactive: Icon.home.smile.outline,
      },
    },
    // Temporary placeholder items
    // {
    //   displayText: "News",
    //   href: "/news",
    //   icon: {
    //     active: Icon.news.solid,
    //     inactive: Icon.news.outline,
    //   },
    // },
    {
      displayText: "Explore",
      href: "/explore",
      icon: {
        active: Icon.compass.bold,
        inactive: Icon.compass.outline,
      },
    },
    {
      displayText: "Shop",
      href: "/shop",
      icon: {
        active: Icon.shop.bold,
        inactive: Icon.shop.outline,
      },
    },
  ];
}

function AuthNavigation() {
  return (
    <nav class="grid group/auth-nav">
      <NavigationItem
        displayText="Sign in"
        href="/sign-in"
        icon={{ active: Icon.login.bold, inactive: Icon.login.outline }}
      />
      <NavigationItem
        displayText="Sign up"
        href="/sign-up"
        icon={{ active: Icon.userPlus.bold, inactive: Icon.userPlus.outline }}
      />
    </nav>
  );
}

function NavigationItem(props: NavigationLinkItemWithStateIcon) {
  return (
    <AWithState
      href={props.href}
      class="flex py-1 group"
      activeClass="font-semibold"
      end
    >
      {({ isActive }) => (
        <div class="inline-flex items-center gap-3 rounded-full p-3 group-hover:bg-muted">
          <Dynamic
            component={isActive() ? props.icon.active : props.icon.inactive}
            classList={{
              "w-7 h-7 shrink-0": true,
              "text-accent": isActive(),
            }}
          />
          <span class="pr-2 text-xl hidden opacity-0 transition-opacity lg:inline-flex group-hover/container:opacity-100">
            {props.displayText}
          </span>
        </div>
      )}
    </AWithState>
  );
}
