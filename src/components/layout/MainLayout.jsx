import React from 'react';
import styles from './MainLayout.module.css';

function MainLayout({ sidebar, sidebarMode = 'expanded', topLeft, topRight, children, theme }) {
  return (
    <div
      className={`${styles.root} ${sidebar ? (sidebarMode === 'collapsed' ? styles.collapsedSidebar : '') : styles.noSidebar}`}
      data-testid="app-root"
      data-theme={theme}
    >
      {topLeft && (
        <div className={styles.topLeft}>
          {topLeft}
        </div>
      )}
      {topRight && (
        <div className={styles.topRight}>
          {topRight}
        </div>
      )}
      {sidebar}
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
