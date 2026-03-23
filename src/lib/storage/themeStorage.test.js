import { loadTheme, saveTheme } from './themeStorage';

describe('themeStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saveTheme('dark') saves to localStorage under key theme", () => {
    saveTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test("loadTheme() returns 'dark' if stored", () => {
    localStorage.setItem('theme', 'dark');
    expect(loadTheme()).toBe('dark');
  });

  test("loadTheme() returns 'light' by default if missing", () => {
    expect(loadTheme()).toBe('light');
  });

  test("loadTheme() returns 'light' if value is corrupted", () => {
    localStorage.setItem('theme', 'nope');
    expect(loadTheme()).toBe('light');
  });
});

