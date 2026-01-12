import React, { PropsWithChildren } from "react";
import { getPostHog } from "@/hooks/usePostHog";

export interface Props {
  href: string;
  external?: boolean;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const isExternalLink = (href: string) =>
  href == null || href.startsWith("http://") || href.startsWith("https://");

export const Link: React.FC<PropsWithChildren<Props>> = ({
  href,
  external = false,
  children,
  onClick,
  className = "",
  id,
}) => {
  const isExternal = isExternalLink(href) || external;
  const isHashLink = href?.startsWith("#");

  const handleClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.capture("link_clicked", {
        target: href,
        is_external: external,
        is_hash: isHashLink,
      });
    }

    onClick?.(e);
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={className}
        id={id}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className} id={id} onClick={handleClick}>
      {children}
    </a>
  );
};
