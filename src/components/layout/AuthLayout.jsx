import React from 'react';
import styles from './AuthLayout.module.css';
import { useTheme } from '../../hooks/useTheme';
import ToggleTheme from '../ui/ToggleTheme';
import successBlack from '../../assets/success-icon-black.svg';
import successWhite from '../../assets/success-icon-white.svg';

function AuthLayout({ children, title, subtitle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.root} data-theme={theme} data-testid="app-root">
      <div className={styles.themeToggleContainer}>
         <ToggleTheme theme={theme} onToggle={toggleTheme} />
      </div>

      <main className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img
              src={theme === 'dark' ? successBlack : successWhite}
              alt=""
              aria-hidden="true"
              className={styles.logoIcon}
            />
          </div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
