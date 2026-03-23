const THEME_KEY = 'theme';

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return saved === 'dark' || saved === 'light' ? saved : 'light';
}

