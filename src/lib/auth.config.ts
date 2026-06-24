import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      credentials: {},
      authorize: async () => {
        return null;
      },
    }),
  ],

  trustHost: true,
};

export default authConfig;