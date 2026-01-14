"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useEnhancedAuth } from "@/components/enhanced-auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Background } from "@/components/background";

export default function Login() {
  const { user, isLoading } = useEnhancedAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (isLoading) {
    return (
      <Background>
        <section className="py-28 lg:pt-44 lg:pb-32">
          <div className="container">
            <div className="flex justify-center">
              <div className="text-muted-foreground">Loading...</div>
            </div>
          </div>
        </section>
      </Background>
    );
  }

  if (user) {
    return (
      <Background>
        <section className="py-28 lg:pt-44 lg:pb-32">
          <div className="container">
            <Card className="mx-auto w-full max-w-md p-6">
              <CardHeader className="text-center">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={94}
                  height={18}
                  className="mb-4 mx-auto dark:invert"
                />
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  You are successfully signed in.
                </p>
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="w-full"
                >
                  Continue to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </Background>
    );
  }

  const handlePatreonSignIn = async () => {
    setIsSigningIn(true);
    try {
      await authClient.signIn.oauth2({
        providerId: "patreon",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Background>
      <section className="py-28 lg:pt-44 lg:pb-32">
        <div className="container">
          <Card className="mx-auto w-full max-w-sm">
            <CardHeader className="flex flex-col items-center space-y-0">
              <Image
                src="/logo.svg"
                alt="logo"
                width={94}
                height={18}
                className="mb-7 dark:invert"
              />
              <p className="mb-2 text-2xl font-bold">Welcome to AWFixer</p>
              <p className="text-muted-foreground text-center">
                Sign in with Patreon to access your account
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handlePatreonSignIn}
                disabled={isSigningIn}
                className="w-full"
              >
                {isSigningIn ? "Signing in..." : "Continue with Patreon"}
              </Button>
              
              <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                <p>Need Patreon access?</p>
                <a 
                  href="https://www.patreon.com/awfixer" 
                  className="text-primary font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Become a Patron
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Background>
  );
}
