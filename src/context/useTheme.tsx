import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return {
    currentTheme: context.currentTheme,
    themes: context.themes,
    setTheme: context.setTheme,
    addTheme: context.addTheme,
  };
};

export default useTheme;
