import React, { createContext, useState, useCallback, ReactNode } from "react";

export type ThemeVariables = {
  [key: string]: string;
};

export interface Theme {
  name: string;
  variables: ThemeVariables;
}

interface ThemeContextProps {
  currentTheme: string;
  themes: Record<string, Theme>;
  setTheme: (themeName: string) => void;
  addTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
  themes: Record<string, Theme>;
}

export const ThemeProvider = ({
  children,
  themes,
  initialTheme = Object.keys(themes)[0],
}: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    const stored = window.localStorage.getItem("theme");
    return stored?.trim() && themes[stored.trim()]
      ? stored.trim()
      : initialTheme;
  });
  const [themeState, setThemeState] = useState(themes);

  const setTheme = useCallback(
    (themeName: string) => {
      const theme = themeState[themeName];
      if (!theme) {
        console.warn(`Theme "${themeName}" not found`);
        return;
      }

      Object.entries(theme.variables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value as string);
      });
      localStorage.setItem("theme", themeName);
      setCurrentTheme(themeName);
    },
    [themeState]
  );

  const addTheme = useCallback(
    (theme: Theme) => {
      setThemeState((prev: Record<string, Theme>) => ({
        ...prev,
        [theme.name]: theme,
      }));
      if (theme.name === currentTheme) {
        Object.entries(theme.variables).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value as string);
        });
      }
    },
    [currentTheme]
  );

  const value = React.useMemo(
    () => ({
      currentTheme,
      themes: themeState,
      setTheme,
      addTheme,
    }),
    [currentTheme, themeState, setTheme, addTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
