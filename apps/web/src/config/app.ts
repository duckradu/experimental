import { type SessionConfig } from "vinxi/http";

export const INITIAL_ACTOR = {
  pid: "kameleon",
};

export const appConfig = {
  name: "kameleon.social",
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
