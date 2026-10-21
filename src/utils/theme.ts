import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'valliance_theme';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return getSystemTheme();
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }

  // Update mobile status bar theme color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#08090B' : '#F5F3ED');
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors
  }

  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Initial sync
    applyTheme(theme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: Theme }>;
      if (customEvent.detail?.theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    window.addEventListener('themeChanged', handleThemeChange);

    // Also listen to system preference changes if user hasn't explicitly set a preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          const newTheme: Theme = e.matches ? 'dark' : 'light';
          setThemeState(newTheme);
          applyTheme(newTheme);
        }
      } catch {
        // Ignore
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };
}
