import { For } from "solid-js";

import { SettingsHeader, SettingsSection } from "~/components/settings";
import { Separator } from "~/components/ui/separator";

export default function SettingsOverview() {
  return (
    <>
      <SettingsHeader
        size={1}
        headingText="Overview"
        subHeadingText="Manage your settings. Need to improve copy!"
      />

      <Separator />

      <SettingsSection>
        <SettingsHeader size={2} headingText="Start guide" />

        <div class="grid grid-cols-4 gap-layout">
          <For each={[...new Array(4).fill(0)]}>
            {() => <div class="rounded bg-red aspect-square" />}
          </For>
        </div>
      </SettingsSection>

      <SettingsSection>
        <SettingsHeader
          size={2}
          headingText="Integrations/extensions quick settings?"
        />

        <div class="grid grid-cols-4 gap-layout">
          <For each={[...new Array(4).fill(0)]}>
            {() => <div class="rounded bg-green aspect-square" />}
          </For>
        </div>
      </SettingsSection>

      <SettingsSection>
        <SettingsHeader size={2} headingText="FAQ" />

        <div class="grid grid-cols-4 gap-layout">
          <For each={[...new Array(4).fill(0)]}>
            {() => <div class="rounded bg-yellow aspect-square" />}
          </For>
        </div>
      </SettingsSection>
    </>
  );
}
