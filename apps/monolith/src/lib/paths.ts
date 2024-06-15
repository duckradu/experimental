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
    };
  },
};
