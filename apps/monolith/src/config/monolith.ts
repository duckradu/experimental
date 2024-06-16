import { SessionConfig } from "vinxi/http";

import { paths } from "~/lib/paths";

export const INITIAL_ACTOR = {
  pid: "kameleon",
};

export const appConfig = {
  name: "kameleon.social",

  aboutUsRecordLink: paths.actor(INITIAL_ACTOR.pid).record("about-us").root,
  termsAndPrivacyRecordLink: paths
    .actor(INITIAL_ACTOR.pid)
    .record("terms-and-privacy").root,
  helpRecordLink: paths.actor(INITIAL_ACTOR.pid).record("help").root,
  sendFeedbackRecordLink: paths.actor(INITIAL_ACTOR.pid).record("send-feedback")
    .root,
};

export const sessionConfig = {
  password: process.env.SESSION_SECRET,
} as SessionConfig;
