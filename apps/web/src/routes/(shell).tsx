import {
  A,
  RouteSectionProps,
  action,
  useAction,
  useLocation,
  useSubmission,
} from "@solidjs/router";
import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import { AWithState } from "~/components/a-with-state";
import { Avatar } from "~/components/ui/avatar";
import { Icon } from "~/components/ui/icon";
import { Menu } from "~/components/ui/menu";

import { useAuth } from "~/providers/authentication";

import * as AuthenticationService from "~/lib/api/authentication/authentication.service";

import { fullNameToAvatarFallback } from "~/lib/utils/common";

import { NavigationLinkItemWithStateIcon } from "~/types";

const signOutAction = action(async () => {
  "use server";

  const session = await AuthenticationService.getSession();

  await session.update({ actorId: undefined });
}, "authentication:sign-out");

export type ShellLayoutProps = RouteSectionProps;

export default function ShellLayout(props: ShellLayoutProps) {
  const { actor } = useAuth();

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

          <div class="grid mt-auto">
            <Show when={actor()} fallback={<AuthNavigation />}>
              <ActorNavigation />
            </Show>
          </div>
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
      class="flex py-1 rounded-full group"
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

function AuthNavigation() {
  const location = useLocation();

  return (
    <nav class="grid">
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

function ActorNavigation() {
  const { actor } = useAuth();

  const useSignOutAction = useAction(signOutAction);
  const signOutSubmission = useSubmission(signOutAction);

  const navigationItemsAccessor = () => [
    {
      icon: {
        active: Icon.user.bold,
        inactive: Icon.user.outline,
      },
      displayText: "Profile",
      anchorProps: { href: " p_actor.root", end: true },
    },
    {
      icon: {
        active: Icon.chat.dialog["2"].bold,
        inactive: Icon.chat.dialog["2"].outline,
      },
      displayText: "Conversations",
      disabled: true,
      anchorProps: { href: "p_actor.conversations()" },
    },
    {
      icon: {
        active: Icon.bell.bold,
        inactive: Icon.bell.outline,
      },
      displayText: "Notifications",
      disabled: true,
      anchorProps: { href: "p_actor.notifications" },
    },
    {
      icon: {
        active: Icon.bookmark.bold,
        inactive: Icon.bookmark.outline,
      },
      displayText: "Bookmarks",
      disabled: true,
      anchorProps: { href: "p_actor.bookmarks" },
    },
    {
      icon: {
        active: Icon.cloud.bold,
        inactive: Icon.cloud.outline,
      },
      displayText: "Storage",
      disabled: true,
      anchorProps: { href: "p_actor.storage" },
    },
    {
      icon: {
        active: Icon.settings.bold,
        inactive: Icon.settings.outline,
      },
      displayText: "Settings",
      anchorProps: { href: "p_actor.settings.root" },
    },
    {
      icon: signOutSubmission.pending ? Icon.spinner : Icon.logout.outline,
      iconProps: {
        classList: { "animate-spin": signOutSubmission.pending },
      },
      displayText: "Sign out",
      buttonProps: { onClick: useSignOutAction },
    },
  ];

  return (
    <Menu
      trigger={({ getTriggerProps }) => (
        <button
          {...getTriggerProps()}
          classList={{
            "group flex bg-transparent rounded-full": true,
            "gap-2.5 p-3": true,
            "hover:bg-muted focus:bg-muted": true,
            "data-[state=open]:bg-muted [&>div]:data-[state=open]:opacity-100":
              true,
          }}
        >
          <Avatar
            fallback={fullNameToAvatarFallback(actor()!.name)}
            rootClass="border border-background"
          />
          <div class="flex items-center justify-between w-full overflow-hidden">
            <div class="text-sm text-left mr-1 overflow-hidden">
              <strong class="font-semibold text-ellipsis overflow-hidden">
                {actor()!.name}
              </strong>
              <span class="block text-muted-foreground text-ellipsis overflow-hidden">
                @{actor()!.pid}
              </span>
            </div>

            <Icon.menuDots.bold class="shrink-0 ml-auto" />
          </div>
        </button>
      )}
      items={navigationItemsAccessor}
      itemSize="2xl"
      containerSize="full"
      machineOptions={{ positioning: { placement: "top" } }}
    />
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
