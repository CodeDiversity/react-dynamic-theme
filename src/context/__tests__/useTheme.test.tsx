import React from "react";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider";
import { useTheme } from "../useTheme";

const mockThemes = {
  light: {
    name: "light",
    variables: { "--bg-color": "#fff" },
  },
  dark: {
    name: "dark",
    variables: { "--bg-color": "#000" },
  },
};

describe("useTheme", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider themes={mockThemes}>{children}</ThemeProvider>
  );

  it("throws error when used outside ThemeProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a ThemeProvider"
    );
  });

  it("returns current theme and theme functions", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current).toHaveProperty("currentTheme");
    expect(result.current).toHaveProperty("themes");
    expect(result.current).toHaveProperty("setTheme");
    expect(result.current).toHaveProperty("addTheme");
  });

  it("allows adding custom theme", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const customTheme = {
      name: "custom",
      variables: { "--test-var": "#000" },
    };

    act(() => {
      result.current.addTheme(customTheme);
    });

    expect(result.current.themes).toHaveProperty("custom");
  });

  it("allows switching to custom theme", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const customTheme = {
      name: "custom",
      variables: { "--test-var": "#000" },
    };

    act(() => {
      result.current.addTheme(customTheme);
    });

    act(() => {
      result.current.setTheme("custom");
    });

    expect(result.current.currentTheme).toBe("custom");
  });

  it("applies theme variables to document", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme("dark");
    });

    expect(document.documentElement.style.getPropertyValue("--bg-color")).toBe(
      "#000"
    );
  });
});
