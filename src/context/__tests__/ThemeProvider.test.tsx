import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

const TestComponent = () => {
  const { currentTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{currentTheme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("uses first theme as default when no initialTheme provided", () => {
    render(
      <ThemeProvider themes={mockThemes}>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("allows theme switching", () => {
    render(
      <ThemeProvider themes={mockThemes}>
        <TestComponent />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Set Dark"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("persists theme in localStorage", () => {
    render(
      <ThemeProvider themes={mockThemes}>
        <TestComponent />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Set Dark"));
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("uses provided initialTheme", () => {
    render(
      <ThemeProvider themes={mockThemes} initialTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("uses initialTheme when stored theme is not found", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("nonexistent");
    render(
      <ThemeProvider themes={mockThemes} initialTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("warns when theme is not found", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const TestComponent = () => {
      const { setTheme } = useTheme();
      return (
        <button onClick={() => setTheme("nonexistent")}>Set Invalid</button>
      );
    };

    render(
      <ThemeProvider themes={mockThemes}>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Set Invalid"));
    expect(consoleSpy).toHaveBeenCalledWith('Theme "nonexistent" not found');
    consoleSpy.mockRestore();
  });
});
