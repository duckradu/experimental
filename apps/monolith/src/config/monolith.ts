import { paths } from "~/lib/paths";

export const appConfig = {
  name: "kameleon.social",

  aboutUsRecordLink: paths.actor("kameleon").record("about-us").root,
  termsAndPrivacyRecordLink: paths.actor("kameleon").record("terms-and-privacy")
    .root,
  helpRecordLink: paths.actor("kameleon").record("help").root,
  sendFeedbackRecordLink: paths.actor("kameleon").record("send-feedback").root,
};
