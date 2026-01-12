import React, { useMemo, useState } from "react";
import { CheckCircle, Copy } from "react-feather";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import graphql from "react-syntax-highlighter/dist/cjs/languages/prism/graphql";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import toml from "react-syntax-highlighter/dist/cjs/languages/prism/toml";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import ruby from "react-syntax-highlighter/dist/cjs/languages/prism/ruby";
import php from "react-syntax-highlighter/dist/cjs/languages/prism/php";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import elixir from "react-syntax-highlighter/dist/cjs/languages/prism/elixir";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import clojure from "react-syntax-highlighter/dist/cjs/languages/prism/clojure";
import scala from "react-syntax-highlighter/dist/cjs/languages/prism/scala";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import docker from "react-syntax-highlighter/dist/cjs/languages/prism/docker";

SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("javascript", javascript);

interface Props {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export default function CodeBlockIsland({
  children,
  className = "",
  language,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const codeElement = document.querySelector("pre");
    if (codeElement && codeElement.textContent) {
      try {
        await navigator.clipboard.writeText(codeElement.textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const highlightedCode = useMemo(() => {
    if (!children) return "";

    return SyntaxHighlighter.highlight(children.toString(), {
      language: language || "text",
      Prism: SyntaxHighlighter,
    });
  }, [children, language]);

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className="rounded-lg bg-gray-50 p-4 overflow-x-auto text-sm"
      />
    </div>
  );
}
