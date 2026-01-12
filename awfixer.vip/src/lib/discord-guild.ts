/**
 * Utility function to add a user to a Discord guild
 * This can be called separately if needed, or it's automatically called after sign-in
 */
export async function addUserToDiscordGuild(accessToken: string): Promise<boolean> {
  const DISCORD_GUILD_ID = import.meta.env.VITE_DISCORD_GUILD_ID || "";
  const DISCORD_BOT_TOKEN = import.meta.env.VITE_DISCORD_BOT_TOKEN || "";

  if (!DISCORD_GUILD_ID || !DISCORD_BOT_TOKEN) {
    console.warn("DISCORD_GUILD_ID or DISCORD_BOT_TOKEN not set");
    return false;
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
      return false;
    }

    console.log(`Successfully added user ${discordUser.id} to guild ${DISCORD_GUILD_ID}`);
    return true;
  } catch (error) {
    console.error("Error adding user to Discord guild:", error);
    return false;
  }
}

