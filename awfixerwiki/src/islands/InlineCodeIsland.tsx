import React, { useState } from "react";

interface Props {
  initialColorMode?: string;
}

export default function InlineCodeIsland({ initialColorMode }: Props) {
  const [copiedCode, setCopiedCode] = useState<string>("");

  const copyToClipboard = async (text: string, element: HTMLElement) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);

      setTimeout(() => setCopiedCode(""), 2000);

      element.classList.add("bg-yellow-200", "dark:bg-yellow-800");
      setTimeout(() => {
        element.classList.remove("bg-yellow-200", "dark:bg-yellow-800");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  React.useEffect(() => {
    const handleCodeClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const codeElement = target.closest("code");

      if (codeElement && codeElement.textContent) {
        event.preventDefault();
        copyToClipboard(codeElement.textContent, codeElement);
      }
    };

    document.addEventListener("click", handleCodeClick);

    return () => {
      document.removeEventListener("click", handleCodeClick);
    };
  }, []);

  return null;
}
