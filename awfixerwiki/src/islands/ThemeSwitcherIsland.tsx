import React, { useState, useEffect } from "react";
import { Moon, Sun } from "react-feather";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: any) => void;
    };
  }
}

interface Props {
  initialTheme?: string;
}

export default function ThemeSwitcherIsland({ initialTheme }: Props) {
  const [theme, setTheme] = useState(initialTheme || "light");
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    document.documentElement.classList.toggle("dark");
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;

    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.capture("theme_toggled", {
        from_theme: theme,
        to_theme: newTheme,
      });
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <button
      className="w-5 h-5 md:w-4 md:h-4 cursor-pointer outline-offset-4"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun width="100%" height="100%" />
      ) : (
        <Moon width="100%" height="100%" />
      )}
      <span className="sr-only" aria-live="polite">
        Toggle {theme === "dark" ? "light" : "dark"} mode
      </span>
    </button>
  );
}
