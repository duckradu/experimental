import { A } from "@solidjs/router";

export default function HomePage() {
  return (
    <div class="flex gap-12 w-full max-w-5xl p-layout">
      <section class="basis-2/3">
        <nav class="border-b [&>a]-(inline-flex px-4 py-3 font-semibold text-muted-foreground/70 border-b-2 border-transparent -mb-px) [&>a.active]-(text-foreground border-accent)">
          <A href="/">For you</A>
          <A href="/recent">Most recent</A>
        </nav>

        <div>COMPOSER</div>

        <div class="relative">
          {/* <div class="sticky top-0">
            <button class="text-accent bg-transparent mx-auto">
              Show 2,324 new posts
            </button>
          </div> */}

          <div>FEED</div>
        </div>
      </section>

      <aside class="basis-1/3 flex flex-col gap-layout [&>section]-(flex flex-col gap-layout) [&>section>header>h3]-(font-semibold text-lg)">
        <section>
          <header>
            <h3>What's happening</h3>
          </header>
        </section>

        <section>
          <header>
            <h3>Popular hashtags</h3>
          </header>
        </section>

        <section>
          <header>
            <h3>Suggested connections</h3>
          </header>
        </section>
      </aside>
    </div>
  );
}
