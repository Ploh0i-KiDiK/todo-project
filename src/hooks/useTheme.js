import { useState, useEffect, useCallback } from 'react';
import { loadTheme, saveTheme } from '../lib/storage/themeStorage';

export function useTheme() {
  const [theme, setTheme] = useState(() => loadTheme());

  
  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  
  useEffect(() => {
    document.body.dataset.theme = theme;
    return () => {
      delete document.body.dataset.theme;
    };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}
