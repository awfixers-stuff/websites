import { betterAuth } from "better-auth";

// Get environment variables
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "your-secret-key-change-in-production";
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173");
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || "";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";

// Function to add user to Discord guild
async function addUserToGuild(accessToken: string) {
  if (!DISCORD_GUILD_ID || !DISCORD_BOT_TOKEN) {
    console.warn("DISCORD_GUILD_ID or DISCORD_BOT_TOKEN not set, skipping guild addition");
    return;
  }

  try {
    // Get user's Discord ID from the access token
    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch Discord user info");
    }

    const discordUser = await userResponse.json();

    // Add user to guild using OAuth2 access token
    const guildResponse = await fetch(
      `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${discordUser.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      }
    );

    if (!guildResponse.ok) {
      const errorText = await guildResponse.text();
      console.error("Failed to add user to guild:", errorText);
      // Don't throw - we don't want to fail the entire auth flow if guild addition fails
    } else {
      console.log(`Successfully added user ${discordUser.id} to guild ${DISCORD_GUILD_ID}`);
    }
  } catch (error) {
    console.error("Error adding user to Discord guild:", error);
    // Don't throw - we don't want to fail the entire auth flow
  }
}

export const auth = betterAuth({
  database: null, // Database-less configuration
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL,
  basePath: "/api/auth",
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  socialProviders: {
    discord: {
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      scope: ["identify", "guilds.join"],
    },
  },
  callbacks: {
    async afterSignIn({ account }: { user: any; account: any }) {
      // Add user to Discord guild after successful sign-in
      if (account?.provider === "discord" && account.accessToken) {
        await addUserToGuild(account.accessToken);
      }
    },
  },
});

export type Session = typeof auth.$Infer.Session;

