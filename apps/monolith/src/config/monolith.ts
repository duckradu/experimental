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

export const sessionConfig: SessionConfig = {
  cookie: {
    // domain?: string | undefined
    // encode?: (value: string) => string
    // expires?: Date | undefined
    httpOnly: true,
    // maxAge?: number | undefined
    path: "/",
    // priority?: "low" | "medium" | "high" | undefined
    sameSite: "lax",
    secure: true,
  },
  password: process.env.SESSION_SECRET!,
  // maxAge?: number | undefined used to set `expires` on cookie
  // name: SESSION_COOKIE_NAME,
};
