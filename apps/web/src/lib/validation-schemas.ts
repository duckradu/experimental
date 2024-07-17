import * as v from "valibot";

import { __isDev__ } from "~/lib/utils/common";

export const email = v.pipe(
  v.string(),
  v.nonEmpty("Please enter your email."),
  v.email("The email is badly formatted."),
);

// TODO: Dynamic rules if is dev
export const password = v.pipe(
  v.string(),
  v.nonEmpty("Please enter your password."),
  v.minLength(8, "Your password is too short."),
  // v.maxLength(30, "Your password is too long."),
  // v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
  // v.regex(/[A-Z]/, "Your password must contain a uppercase letter."),
  // v.regex(/[0-9]/, "Your password must contain a number."),
);
