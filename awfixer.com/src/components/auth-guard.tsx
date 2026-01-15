'use client';

import { useAuth } from '@/hooks/use-auth';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredTier?: string;
  requireActive?: boolean;
}

export function AuthGuard({ 
  children, 
  fallback, 
  requiredTier,
  requireActive = true 
}: AuthGuardProps) {
  const { user, subscription, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Authentication has been removed from this application.</p>
          <div className="bg-gray-500 text-white font-bold py-2 px-6 rounded-full cursor-not-allowed opacity-50">
            Sign In Disabled
          </div>
        </div>
      </div>
    );
  }

  if (requireActive && subscription?.status !== 'active_patron') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Active Patreon Subscription Required</h2>
          <p className="text-gray-600 mb-2">
            Current status: <span className="font-semibold">{subscription?.status || 'none'}</span>
          </p>
          {subscription?.isDelinquent && (
            <p className="text-red-600 mb-4">
              Your payment is delinquent. Please update your payment method on Patreon.
            </p>
          )}
          <p className="text-gray-600 mb-6">
            Please support us on Patreon to access this content.
          </p>
          <a
            href="https://www.patreon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full inline-block"
          >
            Become a Patron
          </a>
        </div>
      </div>
    );
  }

  if (requiredTier && subscription?.tier !== requiredTier) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Higher Tier Required</h2>
          <p className="text-gray-600 mb-2">
            This content requires the <span className="font-semibold">{requiredTier}</span> tier.
          </p>
          <p className="text-gray-600 mb-4">
            Your current tier: <span className="font-semibold">{subscription?.tier || 'Free'}</span>
          </p>
          <a
            href="https://www.patreon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full inline-block"
          >
            Upgrade Your Tier
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}