# Patreon Authentication Implementation

This document outlines the complete Patreon OAuth authentication system implemented for the website using Better Auth with databaseless, always-refresh architecture.

## Architecture Overview

The authentication system uses Better Auth in stateless mode with:
- **Databaseless**: No persistent storage, all data in encrypted cookies
- **Always Refresh**: 5-minute cache ensures fresh Patreon data on each request
- **Single Provider**: Patreon as the only OAuth provider
- **Enhanced Session**: Custom session includes Patreon subscription data

## Features Implemented

### Authentication Flow
1. **OAuth Sign-In**: Users authenticate via Patreon OAuth
2. **Token Storage**: Access token stored in encrypted session cookie
3. **Data Fetching**: Fresh Patreon data fetched on every request
4. **Session Refresh**: Automatic refresh when 80% of cache time reached

### Patreon Data Integration
- **User Profile**: Name, email, profile picture, email verification status
- **Subscription Status**: Active, declined, or former patron
- **Payment Status**: Delinquent payment detection
- **Tier Information**: Current subscription tier and amount
- **Support History**: Lifetime support amount and payment dates

## File Structure

```
src/
├── lib/
│   ├── auth.ts              # Better Auth configuration (stateless)
│   ├── auth-client.ts       # Better Auth client setup
│   └── patreon.ts          # Patreon API integration
├── hooks/
│   └── use-auth.ts          # Authentication React hook
├── components/
│   └── auth-guard.tsx       # Route protection component
├── app/
│   ├── api/
│   │   ├── auth/[...all]/route.ts    # Better Auth API handler
│   │   └── patreon/route.ts          # Patreon data endpoint
│   └── protected/page.tsx    # Example protected page
├── middleware.ts                # Route protection middleware
└── .env.local.example          # Environment variables template
```

## Environment Setup

### Required Environment Variables

```bash
# Better Auth Configuration
BETTER_AUTH_SECRET=your-32-character-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Patreon OAuth Configuration
PATREON_CLIENT_ID=your_patreon_client_id
PATREON_CLIENT_SECRET=your_patreon_client_secret
PATREON_REDIRECT_URI=http://localhost:3000/api/auth/oauth2/callback/patreon

# Production Environment Variables (uncomment for production)
# BETTER_AUTH_URL=https://yourdomain.com
# NEXT_PUBLIC_BETTER_AUTH_URL=https://yourdomain.com
# PATREON_REDIRECT_URI=https://yourdomain.com/api/auth/oauth2/callback/patreon
```

### Generate Auth Secret

```bash
openssl rand -base64 32
```

### Patreon OAuth Setup

1. Create OAuth App at [Patreon Developers](https://www.patreon.com/portal/registration/register-clients)
2. Set redirect URI: `{BETTER_AUTH_URL}/api/auth/oauth2/callback/patreon`
3. Add required scopes:
   - `identity`
   - `identity[email]`
   - `identity.memberships`
   - `campaigns`
   - `campaigns.members`
4. Copy Client ID and Secret to environment variables

## Implementation Details

### Stateless Session Configuration

```typescript
// src/lib/auth.ts
export const auth = betterAuth({
  // No database configuration - enables stateless mode
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes - forces fresh data
      strategy: "jwe", // Encrypted cookies
      refreshCache: true, // Auto-refresh before expiry
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
```

### Patreon Data Fetching

```typescript
// src/lib/patreon.ts
export class PatreonAPI {
  async getEnhancedUserData(): Promise<EnhancedUserData> {
    // Fetch user profile and membership data
    const [userData, membershipData] = await Promise.all([
      this.getUserData(),
      this.getMembershipData(),
    ]);

    // Extract active membership and tier information
    const activeMembership = membershipData.find(
      (m) => m.attributes.patron_status === 'active_patron'
    );

    return {
      user: { /* profile data */ },
      subscription: {
        status: activeMembership?.attributes.patron_status || 'none',
        isDelinquent: activeMembership?.attributes.pledge_cancellation_pending || false,
        tier: tier?.attributes.title || 'Free',
        tierAmount: tier?.attributes.amount_cents || 0,
        lastChargeDate: activeMembership?.attributes.last_charge_date,
        nextChargeDate: activeMembership?.attributes.next_charge_date,
        lifetimeSupport: activeMembership?.attributes.lifetime_support_cents || 0,
      },
    };
  }
}
```

### Client-Side Authentication

```typescript
// src/hooks/use-auth.ts
export function useAuth() {
  const [state, setState] = useState<AuthState>({...});

  const refreshUserData = async () => {
    // Get current session
    const session = await authClient.getSession();
    
    if (!session.data) {
      // Handle unauthenticated state
      setState({ user: null, subscription: null, isLoading: false });
      return;
    }

    // Fetch fresh Patreon data via API endpoint
    const response = await fetch('/api/patreon', {
      credentials: 'include', // Include authentication cookies
    });
    
    const freshData = await response.json();
    
    setState({
      user: freshData.user,
      subscription: freshData.subscription,
      isLoading: false,
    });
  };

  // Automatic refresh every 5 minutes
  useEffect(() => {
    refreshUserData();
    const interval = setInterval(refreshUserData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { user, subscription, isLoading, refresh, signIn, signOut };
}
```

### Route Protection

```typescript
// src/components/auth-guard.tsx
export function AuthGuard({ 
  children, 
  fallback, 
  requiredTier,
  requireActive = true 
}: AuthGuardProps) {
  const { user, subscription, isLoading } = useAuth();

  // Handle loading state
  if (isLoading) return <LoadingSpinner />;
  
  // Handle unauthenticated users
  if (!user) return fallback || <SignInPrompt />;
  
  // Check subscription status
  if (requireActive && subscription?.status !== 'active_patron') {
    return <PaymentRequired status={subscription?.status} />;
  }
  
  // Check tier requirements
  if (requiredTier && subscription?.tier !== requiredTier) {
    return <TierUpgrade current={subscription?.tier} required={requiredTier} />;
  }
  
  return <>{children}</>;
}
```

## Usage Examples

### Basic Authentication

```tsx
import { useAuth } from '@/hooks/use-auth';

function UserProfile() {
  const { user, subscription, signIn, signOut } = useAuth();

  if (!user) {
    return (
      <div>
        <button onClick={signIn}>Sign In with Patreon</button>
      </div>
    );
  }

  return (
    <div>
      <img src={user.image} alt={user.name} />
      <h1>{user.name}</h1>
      <p>Subscription: {subscription.tier}</p>
      <p>Status: {subscription.status}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Protected Routes

```tsx
import { AuthGuard } from '@/components/auth-guard';

function PremiumContent() {
  return (
    <AuthGuard requiredTier="Gold" requireActive={true}>
      <div>
        <h1>Premium Content</h1>
        <p>This content is only available to Gold tier patrons.</p>
      </div>
    </AuthGuard>
  );
}
```

### Middleware Integration

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Check for authentication cookie
  const sessionCookie = request.cookies.get('better-auth.session_token');
  
  if (!sessionCookie && request.nextUrl.pathname.startsWith('/protected')) {
    // Redirect to sign-in page
    const signInUrl = new URL('/api/auth/signin/patreon', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
```

## Deployment on Vercel

### Environment Variables

Add the following to your Vercel environment variables:

- `BETTER_AUTH_SECRET` - Your 32-character secret key
- `PATREON_CLIENT_ID` - Patreon application client ID
- `PATREON_CLIENT_SECRET` - Patreon application client secret
- `BETTER_AUTH_URL` - `https://yourdomain.com`
- `NEXT_PUBLIC_BETTER_AUTH_URL` - `https://yourdomain.com`

### Redirect URIs

For production, ensure your Patreon app has these redirect URIs:
- `https://yourdomain.com/api/auth/oauth2/callback/patreon`
- `https://yourdomain.com/api/auth/oauth2/callback/patreon`

### Security Considerations

1. **HTTPS Required**: All OAuth URLs must use HTTPS in production
2. **Secret Management**: Use Vercel environment variables, never commit secrets
3. **Cookie Security**: JWE encryption secures session cookies
4. **Rate Limiting**: Patreon API has rate limits - implement caching
5. **Error Handling**: Graceful fallbacks for API failures

## Testing

### Local Development

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Patreon OAuth credentials
3. Run `npm run dev`
4. Test OAuth flow at `http://localhost:3000/api/auth/signin/patreon`

### Production Testing

1. Deploy to Vercel with environment variables set
2. Test OAuth flow on production domain
3. Verify protected routes redirect unauthenticated users
4. Test session refresh functionality

## Troubleshooting

### Common Issues

**Issue**: `getAccessToken not working in stateless mode`
- **Solution**: Use custom API endpoint to fetch Patreon data

**Issue**: CORS errors with Patreon API
- **Solution**: Ensure proper redirect URIs are configured in Patreon app

**Issue**: Session not persisting
- **Solution**: Check BETTER_AUTH_SECRET is 32 characters and properly set

**Issue**: Protected routes not working
- **Solution**: Verify middleware is correctly configured and deployed

## API Endpoints

### Authentication Endpoints
- `GET /api/auth/signin/patreon` - Initiate OAuth flow
- `GET /api/auth/oauth2/callback/patreon` - OAuth callback
- `GET /api/auth/signout` - Sign out user

### Data Endpoints
- `GET /api/patreon` - Fetch current Patreon data
- Requires authentication cookie
- Returns enhanced user and subscription data

## Next Steps

1. **Add More Patreon Features**: Campaign data, rewards management
2. **Enhanced Error Handling**: Retry logic, better error messages
3. **Analytics Integration**: Track conversion and subscription metrics
4. **User Dashboard**: Profile management, subscription details
5. **Admin Panel**: View all users and their tiers

## Support

For issues with the authentication system:
1. Check this documentation for common solutions
2. Review Better Auth documentation: https://better-auth.com/docs
3. Review Patreon OAuth documentation
4. Check Vercel deployment logs