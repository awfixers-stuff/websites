"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface EnhancedUserData {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
  } | null;
  subscription: {
    status: string;
    tier?: string;
    isDelinquent?: boolean;
  } | null;
}

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
      
      setUser(null);
      setSubscription(null);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      setUser(null);
      setSubscription(null);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.warn('Authentication has been removed');
      setError('Authentication has been removed');
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