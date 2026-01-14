import { betterAuth } from "better-auth";
import { genericOAuth, patreon } from "better-auth/plugins";

export const auth = betterAuth({
  // No database configuration - enables stateless mode
  plugins: [
    genericOAuth({
      config: [
        patreon({
          clientId: process.env.PATREON_CLIENT_ID!,
          clientSecret: process.env.PATREON_CLIENT_SECRET!,
          scopes: [
            "identity",
            "identity[email]",
            "identity.memberships",
            "campaigns",
            "campaigns.members"
          ],
        }),
      ],
    }),
  ],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes - shorter cache for fresh data
      strategy: "jwe",
      refreshCache: true,
    },
    expiresIn: 60 * 60 * 24, // 24 hours
    freshAge: 5 * 60, // 5 minutes - forces refresh
  },

  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
    updateAccountOnSignIn: true,
  },
});