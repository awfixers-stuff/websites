import { useRef, useState } from "react";
import copy from "copy-to-clipboard";
import { getPostHog } from "./usePostHog";

export const useCopy = (): [boolean, (text: string) => void] => {
  const [showCopied, setShowCopied] = useState(false);
  const timeoutRef = useRef<any>(null);

  const copyText = (text: string) => {
    copy(text);
    setShowCopied(true);

    // Track code copied event
    getPostHog().capture("code_copied", {
      text_length: text.length,
      // Only include first 100 chars to avoid sending too much data
      text_preview: text.substring(0, 100),
    });

    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowCopied(false);
      timeoutRef.current = null;
    }, 1500);
  };

  return [showCopied, copyText];
};
