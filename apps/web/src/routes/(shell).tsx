import { A, RouteSectionProps, useLocation } from "@solidjs/router";
import { ComponentProps, For } from "solid-js";
import { Dynamic } from "solid-js/web";

import { AWithState } from "~/components/a-with-state";
import { Icon } from "~/components/ui/icon";

import { NavigationLinkItemWithStateIcon } from "~/types";

export type ShellLayoutProps = RouteSectionProps;

export default function ShellLayout(props: ShellLayoutProps) {
  return (
    <div class="relative flex w-full min-h-screen">
      <header class="fixed left-0 top-0 w-64 h-screen z-40 border-r border-border">
        <div class="flex flex-col h-full p-layout overflow-y-auto">
          <A
            href="/"
            class="flex justify-center items-center gap-3 px-3 pt-1 pb-2 w-13 h-13 hover:bg-muted rounded-full"
          >
            <Icon.logo.bold class="w-7 h-7 shrink-0" />
          </A>

          <PrimaryNavigation />

          <AuthNavigation class="mt-auto" />
        </div>
      </header>

      <main class="p-layout flex justify-center w-full ml-64">
        <div class="max-w-5xl w-full">{props.children}</div>
      </main>
    </div>
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
          <span class="pr-2 text-xl">{props.displayText}</span>
        </div>
      )}
    </AWithState>
  );
}

function PrimaryNavigation() {
  const navigationItems = usePrimaryNavigationItems();

  return (
    <nav class="grid">
      <For each={navigationItems}>{NavigationItem}</For>
    </nav>
  );
}

export interface AuthNavigationProps extends ComponentProps<"nav"> {}

function AuthNavigation(props: AuthNavigationProps) {
  const location = useLocation();

  return (
    <nav
      classList={{
        grid: true,
        [props.class!]: Boolean(props.class?.length),
      }}
    >
      <NavigationItem
        displayText="Sign in"
        href={`/sign-in?redirect-to=${location.pathname}`}
        icon={{ active: Icon.login.bold, inactive: Icon.login.outline }}
      />
      {/* <NavigationItem
        displayText="Sign up"
        href="/sign-up"
        icon={{ active: Icon.userPlus.bold, inactive: Icon.userPlus.outline }}
      /> */}
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
