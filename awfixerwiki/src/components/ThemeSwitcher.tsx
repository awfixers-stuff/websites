import React from "react";
import { Moon, Sun } from "react-feather";

import { useIsMounted } from "../hooks/useIsMounted";
import { useTheme } from "../styles/theme";
import { getPostHog } from "@/hooks/usePostHog";

export const ThemeSwitcher: React.FC = () => {
  const { colorMode, setColorMode } = useTheme();
  const toggleColorMode = () => {
    const newMode = colorMode === "dark" ? "light" : "dark";
    setColorMode(newMode);

    // Track theme toggle event
    getPostHog().capture("theme_toggled", {
      from_theme: colorMode,
      to_theme: newMode,
    });
  };

  const isMounted = useIsMounted();

  return (
    <>
      {isMounted && (
        <button
          className="w-5 h-5 md:w-4 md:h-4 cursor-pointer outline-offset-4"
          onClick={toggleColorMode}
        >
          {colorMode === "dark" ? (
            <Sun width="100%" height="100%" />
          ) : (
            <Moon width="100%" height="100%" />
          )}
          <span className="sr-only" aria-live="polite">
            Toggle {colorMode === "dark" ? "light" : "dark"} mode
          </span>
        </button>
      )}
    </>
  );
};
