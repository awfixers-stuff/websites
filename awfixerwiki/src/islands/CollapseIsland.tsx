import React, { useState, useCallback, useEffect } from "react";

interface Props {
  title: string;
  slug?: string;
  initialExpanded?: boolean;
}

export default function CollapseIsland({
  title,
  slug,
  initialExpanded,
}: Props) {
  const newSlug = slug || title.toLowerCase().replace(/\s+/g, "-");
  const [isExpanded, setIsExpanded] = useState(initialExpanded || false);

  const updateHash = useCallback((newSlug: string) => {
    window.history.pushState(
      null,
      "",
      newSlug
        ? `#${newSlug}`
        : window.location.pathname + window.location.search,
    );
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      const newIsExpanded = !isExpanded;
      setIsExpanded(newIsExpanded);

      if (newIsExpanded) {
        updateHash(newSlug);
      } else {
        const currentHashElements = Array.from(
          document.querySelectorAll("details[open]"),
        )
          .map(el => el.id)
          .filter(id => id && id !== newSlug);
        const newHash = currentHashElements.pop() || "";
        updateHash(newHash);
      }
    },
    [isExpanded, updateHash],
  );

  useEffect(() => {
    const currentHash = window.location.hash.slice(1);

    if (currentHash === newSlug) {
      setIsExpanded(true);
      updateHash(newSlug);
    }
  }, [newSlug, updateHash]);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash.slice(1);

      if (currentHash === newSlug) {
        setIsExpanded(true);
        updateHash(newSlug);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [newSlug, updateHash]);

  return null;
}
