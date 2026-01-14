"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    chatwootSettings?: {
      hideMessageBubble?: boolean;
      position?: "left" | "right";
      locale?: string;
      type?: "standard" | "expanded_bubble";
    };
  }
}

export function Chatwoot() {
  useEffect(() => {
    // Get environment variables
    const baseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
    const websiteToken = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN;

    // Don't load if environment variables are missing
    if (!baseUrl || !websiteToken) {
      console.warn(
        "Chatwoot: Missing environment variables. Set NEXT_PUBLIC_CHATWOOT_BASE_URL and NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN"
      );
      return;
    }

    // Check if script is already loaded
    if (window.chatwootSDK) {
      return;
    }

    // Load Chatwoot SDK
    const script = document.createElement("script");
    script.src = `${baseUrl}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => {
      window.chatwootSDK?.run({
        websiteToken,
        baseUrl,
      });
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove script on unmount if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
