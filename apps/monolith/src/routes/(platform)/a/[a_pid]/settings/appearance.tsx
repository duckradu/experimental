import { SettingsHeader } from "~/components/settings";
import { Separator } from "~/components/ui/separator";

export default function ThemeSettings() {
  return (
    <>
      <SettingsHeader
        headingText="Appearance"
        subHeadingText="Fine grained control over the appearance of everything in the app"
      />

      <Separator />
    </>
  );
}
