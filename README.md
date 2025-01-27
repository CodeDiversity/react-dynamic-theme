# Theme Package (Beta)

A lightweight and flexible theme management system for React applications using CSS variables.

## Installation

```bash
npm install theme-package@beta
```

## Features

- 🎨 Streamlined theme switching
- ✨ Fully customizable themes
- 💾 Automatic theme persistence
- 🔄 Immediate theme updates
- 📦 TypeScript support
- 🧪 100% test coverage
- 🛠️ Zero dependencies (except React)
- 📚 Detailed documentation
- 🔍 Type-safe APIs

## Quick Start

```tsx
import { ThemeProvider, useTheme } from "theme-package";

const themes = {
  light: {
    name: "light",
    variables: {
      "--bg-color": "#ffffff",
      "--text-color": "#000000",
    },
  },
  dark: {
    name: "dark",
    variables: {
      "--bg-color": "#000000",
      "--text-color": "#ffffff",
    },
  },
};

// Wrap your app with ThemeProvider
function App() {
  return (
    <ThemeProvider themes={themes} initialTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}

// Use the theme in any component
function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
    >
      Toggle Theme
    </button>
  );
}
```

## Adding Custom Themes

```tsx
import { Theme, useTheme } from "theme-package";

const customTheme: Theme = {
  name: "custom",
  variables: {
    "--bg-color": "#f0f0f0",
    "--text-color": "#333333",
    "--primary-color": "#0066cc",
    // ... add more CSS variables
  },
};

function ThemeManager() {
  const { addTheme, setTheme } = useTheme();

  const handleAddTheme = () => {
    addTheme(customTheme); // Add the theme
    setTheme("custom"); // Apply it immediately
  };

  return <button onClick={handleAddTheme}>Use Custom Theme</button>;
}
```

## Theme Persistence

Themes are automatically persisted in localStorage. The ThemeProvider will:

1. Check localStorage for a saved theme on initialization
2. Fall back to initialTheme if no theme is saved or found
3. Automatically save theme changes
4. Handle missing or incorrect stored themes appropriately

## API Reference

### ThemeProvider Props

| Prop         | Type                  | Required | Default         | Description                  |
| ------------ | --------------------- | -------- | --------------- | ---------------------------- |
| themes       | Record<string, Theme> | Yes      | -               | Object containing all themes |
| initialTheme | string                | No       | First theme key | Initial theme to use         |

### useTheme Hook

Returns an object with:

- `currentTheme`: string - Current active theme name
- `themes`: Record<string, Theme> - All available themes
- `setTheme`: (themeName: string) => void - Function to switch themes (applies immediately)
- `addTheme`: (theme: Theme) => void - Function to add a new theme

### Theme Interface

```typescript
interface Theme {
  name: string;
  variables: {
    [key: string]: string; // CSS variables and their values
  };
}
```

## Development

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format

# Build package
npm run build
```

## Testing

The package includes a comprehensive test suite with 100% coverage using Jest and React Testing Library.

## Contributing

We welcome contributions! This package is in beta, and we'd love your help to improve it.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Ensure code is formatted (`npm run format`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT

## Todo

- [ ] Add theme transition animations
- [ ] Add theme validation
- [ ] Add more built-in themes
- [ ] Add theme export/import functionality
- [ ] Add theme preview component
- [ ] Add theme editor component
- [ ] Add CSS-in-JS integration examples
- [ ] Add Storybook documentation
- [ ] Add performance optimizations
- [ ] Add theme inheritance support

---

🌟 Star us on GitHub if you find this package helpful!
