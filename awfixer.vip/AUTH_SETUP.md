# Better Auth Setup with Discord OAuth2

This project uses better-auth with a database-less configuration and Discord OAuth2 login. Users are automatically added to a specified Discord guild upon sign-in.

## Environment Variables

Create a `.env` file in the root directory (or set these in Vercel's environment variables):

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-change-in-production-min-32-characters
BETTER_AUTH_URL=http://localhost:5173

# Discord OAuth2 Configuration
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret

# Discord Guild Configuration
# The ID of the Discord server/guild to add users to
DISCORD_GUILD_ID=your-discord-guild-id

# Discord Bot Token
# Required to add users to the guild
# Create a bot in Discord Developer Portal and get the token
DISCORD_BOT_TOKEN=your-discord-bot-token
```

## Discord Application Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "OAuth2" section:
   - Note your **Client ID** and **Client Secret**
   - Add a redirect URI: `https://yourdomain.vercel.app/api/auth/callback/discord`
   - For local development: `http://localhost:5173/api/auth/callback/discord`
   - Select scopes: `identify`, `guilds.join`

4. Go to the "Bot" section:
   - Create a bot if you haven't already
   - Copy the bot token
   - Enable the following bot permissions in your Discord server:
     - `CREATE_INSTANT_INVITE` (required to add members)
     - Optionally: `MANAGE_ROLES`, `MANAGE_NICKNAMES` if you want to assign roles or set nicknames

5. Invite the bot to your Discord server with the necessary permissions

6. Get your Discord Guild ID:
   - Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
   - Right-click on your server and select "Copy Server ID"

## Vercel Deployment

1. Set all environment variables in your Vercel project settings
2. Make sure `BETTER_AUTH_URL` is set to your production domain (e.g., `https://yourdomain.vercel.app`)
3. Deploy your project

## Usage

### Sign In

Navigate to `/signin` to sign in with Discord. After successful authentication, users will be automatically added to the specified Discord guild.

### Using Auth in Components

```tsx
import { useSession, signOut } from "@/lib/auth-client";

function MyComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not signed in</div>;

  return (
    <div>
      <p>Signed in as {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
```

## Files Structure

- `api/auth/[...all].ts` - Vercel serverless function handler for auth routes
- `src/lib/auth.ts` - Server-side auth configuration
- `src/lib/auth-client.ts` - Client-side auth utilities
- `src/pages/SignIn.tsx` - Sign-in page component
- `src/lib/discord-guild.ts` - Utility function to add users to Discord guild

## Notes

- The auth system is database-less, using JWT tokens stored in cookies
- Users are automatically added to the Discord guild after successful sign-in
- The guild addition happens in the `afterSignIn` callback in `src/lib/auth.ts`
- If guild addition fails, it won't prevent the user from signing in (errors are logged but not thrown)

