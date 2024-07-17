import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";

import { SquigglesCentralFocusLayout } from "~/components/squiggles-central-content-layout";
import { Title } from "~/components/title";
import { Icon } from "~/components/ui/icon";

export default function NotFound() {
  return (
    <>
      <Title>Page not found</Title>
      <HttpStatusCode code={404} />

      <SquigglesCentralFocusLayout>
        <main class="max-w-sm w-full text-center space-y-6">
          <h1 class="text-9xl font-black tracking-wide">
            40<span class="-scale-x-100 scale-y-100 inline-block">4</span>
          </h1>

          <div class="space-y-2">
            <h2 class="text-2xl font-semibold tracking-tight">
              Page not found
            </h2>
            <p class="text-muted-foreground">
              The page you are looking for was moved, removed, renamed or might
              have never existed!
            </p>
          </div>

          <A href="/" class="inline-block text-2xl">
            <Icon.home.smile.outline />
          </A>
        </main>
      </SquigglesCentralFocusLayout>
    </>
  );
}
