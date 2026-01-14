'use client';

import { useState, useEffect } from 'react';
import { createAuthClient } from "better-auth/react";
import { authClient } from "@/lib/auth-client";
import { EnhancedUserData, getFreshPatreonData } from "@/lib/patreon";

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

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    subscription: null,
    isLoading: true,
    error: null,
  });

  const refreshUserData = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const session = await authClient.getSession();
      
      if (!session.data) {
        setState({
          user: null,
          subscription: null,
          isLoading: false,
          error: null,
        });
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
        // If Patreon API fails, at least return the basic session data
        console.warn(`Patreon API failed: ${response.status}, using basic session data`);
        setState({
          user: session.data.user ? {
            id: session.data.user.id,
            name: session.data.user.name,
            email: session.data.user.email,
            image: session.data.user.image || '',
            emailVerified: session.data.user.emailVerified,
          } : null,
          subscription: null,
          isLoading: false,
          error: null,
        });
        return;
      }

      const freshData = await response.json();
      
      setState({
        user: freshData.user,
        subscription: freshData.subscription,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Fallback to basic session data
      const session = await authClient.getSession().catch(() => ({ data: null }));
      setState(prev => ({
        ...prev,
        user: session.data?.user ? {
          id: session.data.user.id,
          name: session.data.user.name,
          email: session.data.user.email,
          image: session.data.user.image || '',
          emailVerified: session.data.user.emailVerified,
        } : null,
        subscription: null,
        isLoading: false,
        error: null, // Don't show error to user, just log it
      }));
    }
  };

  const signIn = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authClient.signIn.social({ 
        provider: "patreon",
        callbackURL: window.location.href,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to sign in',
      }));
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authClient.signOut();
      setState({
        user: null,
        subscription: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to sign out',
      }));
    }
  };

  useEffect(() => {
    refreshUserData();
    
    // Set up periodic refresh every 5 minutes
    const interval = setInterval(refreshUserData, 5 * 60 * 1000);
    return () => clearInterval(interval);
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