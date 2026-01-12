import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { transformThemeToCustomProperties } from "theme-custom-properties";

import { ColorMode, colorThemes, defaultColorMode } from "./colors";

import { getCookie, setCookie } from "cookies-next";

const themes = {
  light: { colors: colorThemes.light },
  dark: { colors: colorThemes.dark },
};

interface ThemeState {
  colorMode: ColorMode;
  setColorMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeState>({} as ThemeState);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [colorMode, setColorModeState] =
    React.useState<ColorMode>(defaultColorMode);

  const { bodyCSS } = useMemo(
    () =>
      transformThemeToCustomProperties(themes, {
        defaultTheme: defaultColorMode,
        attribute: "class",
      }),
    [defaultColorMode, themes],
  );

  const setColorMode = React.useCallback((value: string) => {
    const mode = value as ColorMode;
    setColorModeState(mode);
    setCookie("theme", value, { maxAge: 60 * 60 * 24 * 365 * 100 });
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }, []);

  useEffect(() => {
    const savedTheme = getCookie("theme");
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setColorMode(savedTheme);
    } else {
      setColorMode(defaultColorMode);
    }
  }, []);

  useEffect(() => {
    setCookie("theme", colorMode, { maxAge: 60 * 60 * 24 * 365 * 100 });
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(colorMode);
  }, [colorMode]);

  const themeState: ThemeState = {
    colorMode,
    setColorMode,
  };

  return (
    <ThemeContext.Provider value={themeState}>
      <style>{bodyCSS}</style>
      {children}
    </ThemeContext.Provider>
  );
};
