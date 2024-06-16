import { Navigate, useParams } from "@solidjs/router";
import { createRenderEffect } from "solid-js";

import { SettingsHeader } from "~/components/settings";
import { Separator } from "~/components/ui/separator";

import { useAuth } from "~/providers/authentication";

import { paths } from "~/lib/paths";

export default function ThemeSettings() {
  const { actor } = useAuth();
  const params = useParams();

  createRenderEffect(() => {
    if (!actor()) {
      return <Navigate href={paths.actor(params.a_pid).settings.root} />;
    }
  });

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
