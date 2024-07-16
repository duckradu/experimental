import { For } from "solid-js";

import "@unocss/reset/tailwind-compat.css";

import "virtual:uno.css";

import "~/styles/app.css";

export default function App() {
  return (
    <main class="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#082f49] to-[#081924] text-white">
      <section class="space-y-4 border-2 border-sky-950 p-4 rounded-2xl">
        <header class="font-bold text-2xl">SolidStart app running!</header>

        <div>
          <h2 class="font-medium">Useful links to get started:</h2>

          <ul>
            <For
              each={[
                "https://github.com/duckradu/sprout",
                "https://start.solidjs.com",
                "https://github.com/thetarnav/solid-devtools",
                "https://orm.drizzle.team",
                "https://unocss.dev",
              ]}
            >
              {(url) => (
                <li>
                  <a
                    href={url}
                    target="_blank"
                    class="text-blue underline hover:no-underline"
                  >
                    {url}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      </section>
    </main>
  );
}
