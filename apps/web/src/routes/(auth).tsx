import { RouteSectionProps } from "@solidjs/router";

import { SquigglesCentralFocusLayout } from "~/components/squiggles-central-content-layout";

export type AuthLayoutProps = RouteSectionProps;

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <SquigglesCentralFocusLayout>
      <div class="max-w-sm w-full space-y-6">{props.children}</div>
    </SquigglesCentralFocusLayout>
  );
}
