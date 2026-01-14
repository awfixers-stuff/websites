"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import { EnhancedUserData, getFreshPatreonData } from "@/lib/patreon";

interface EnhancedAuthContextType {
  user: EnhancedUserData['user'] | null;
  subscription: EnhancedUserData['subscription'] | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const EnhancedAuthContext = createContext<EnhancedAuthContextType | undefined>(undefined);

export function EnhancedAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<EnhancedUserData['user'] | null>(null);
  const [subscription, setSubscription] = useState<EnhancedUserData['subscription'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const session = await authClient.getSession();
      
      if (!session.data) {
        setUser(null);
        setSubscription(null);
        return;
      }

      // Get fresh Patreon data from our API endpoint
      const response = await fetch('/api/patreon', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        // If Patreon API fails, at least return basic session data
        console.warn(`Patreon API failed: ${response.status}, using basic session data`);
        setUser(session.data.user ? {
          id: session.data.user.id,
          name: session.data.user.name,
          email: session.data.user.email,
          image: session.data.user.image || '',
          emailVerified: session.data.user.emailVerified,
        } : null);
        setSubscription(null);
        return;
      }

      const freshData = await response.json();
      setUser(freshData.user);
      setSubscription(freshData.subscription);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Fallback to basic session data
      const session = await authClient.getSession().catch(() => ({ data: null }));
      setUser(session.data?.user ? {
        id: session.data.user.id,
        name: session.data.user.name,
        email: session.data.user.email,
        image: session.data.user.image || '',
        emailVerified: session.data.user.emailVerified,
      } : null);
      setSubscription(null);
      setError(null); // Don't show error to user, just log it
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authClient.signIn.social({ 
        provider: "patreon",
        callbackURL: window.location.href,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign in');
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authClient.signOut();
      setUser(null);
      setSubscription(null);
    } catch (error) {
      console.error('Sign out error:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    
    // Set up periodic refresh every 5 minutes
    const interval = setInterval(refresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <EnhancedAuthContext.Provider value={{ user, subscription, isLoading, error, refresh, signIn, signOut }}>
      {children}
    </EnhancedAuthContext.Provider>
  );
}

export const useEnhancedAuth = () => {
  const context = useContext(EnhancedAuthContext);
  if (!context) {
    throw new Error("useEnhancedAuth must be used within EnhancedAuthProvider");
  }
  return context;
};