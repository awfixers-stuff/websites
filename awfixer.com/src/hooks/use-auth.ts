'use client';

import { useState, useEffect } from 'react';

export interface AuthState {
  user: EnhancedUserData['user'] | null;
  subscription: EnhancedUserData['subscription'] | null;
  isLoading: boolean;
  error: string | null;
}

export interface BasicUser {
  id: string;
  name: string;
  email: string;
  image?: string | null | undefined;
  emailVerified: boolean;
}

export interface EnhancedUserData {
  user: BasicUser | null;
  subscription: {
    status: string;
    tier?: string;
    isDelinquent?: boolean;
  } | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    subscription: null,
    isLoading: false,
    error: null,
  });

  const refreshUserData = async () => {
    setState({
      user: null,
      subscription: null,
      isLoading: false,
      error: null,
    });
  };

  const signIn = async () => {
    console.warn('Authentication has been removed');
    setState(prev => ({
      ...prev,
      error: 'Authentication has been removed',
    }));
  };

  const signOut = async () => {
    setState({
      user: null,
      subscription: null,
      isLoading: false,
      error: null,
    });
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return {
    user: state.user,
    subscription: state.subscription,
    isLoading: state.isLoading,
    error: state.error,
    refresh: refreshUserData,
    signIn,
    signOut,
  };
}

export function useRequireAuth() {
  const auth = useAuth();
  
  if (auth.isLoading) {
    return { isLoading: true, user: null, subscription: null };
  }
  
  if (!auth.user) {
    throw new Error('Authentication required');
  }
  
  return auth;
}