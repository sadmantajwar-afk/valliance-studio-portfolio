import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'valliance_theme_v2';

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Ignore storage errors
  }
  return 'dark'; // Always default to dark mode
}

let activeTheme: Theme = readStoredTheme();
const listeners = new Set<(theme: Theme) => void>();

export function getTheme(): Theme {
  return activeTheme;
}

export function applyThemeDirectly(newTheme: Theme, persist: boolean = true): void {
  if (typeof document === 'undefined') return;
  activeTheme = newTheme;

  const root = document.documentElement;
  if (newTheme === 'dark') {
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

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', newTheme === 'dark' ? '#08090B' : '#F5F3ED');
  }

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
  }

  // Notify subscribers cleanly
  listeners.forEach((fn) => fn(newTheme));
}

export function toggleTheme(): void {
  applyThemeDirectly(activeTheme === 'dark' ? 'light' : 'dark', true);
}

export function useTheme() {
  const [theme, setLocalTheme] = useState<Theme>(activeTheme);

  useEffect(() => {
    listeners.add(setLocalTheme);
    return () => {
      listeners.delete(setLocalTheme);
    };
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme: (t: Theme) => applyThemeDirectly(t, true),
  };
}
