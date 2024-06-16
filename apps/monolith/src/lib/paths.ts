export const paths = {
  notFound: "/404",

  auth: {
    signUp: "/sign-up",
    signIn: "/sign-in",
  },

  actor: (a_pid: string) => {
    const a_root = `/a/${a_pid}`;

    return {
      root: a_root,

      record: (r_pid: string) => {
        const r_root = `${a_root}/r/${r_pid}`;

        return {
          root: r_root,
        };
      },

      conversations: (c_pid?: string) => {
        const c_root = `${a_root}/c`;

        const pathSegments = [c_root];

        if (typeof c_pid !== "undefined") {
          pathSegments.push(c_pid);
        }

        return pathSegments.join("/");
      },

      notifications: `${a_root}/notifications`,

      bookmarks: `${a_root}/bookmarks`,

      storage: `${a_root}/storage`,

      settings: {
        root: `${a_root}/settings`,

        appearance: `${a_root}/settings/appearance`,
      },
    };
  },
};
