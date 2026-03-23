import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useUser } from '../../hooks/useUser';
import menuBlack from '../../assets/menu-icon-black.svg';
import menuWhite from '../../assets/menu-icon-white.svg';
import tasksIconBlack from '../../assets/list-todo-icon-black.svg';
import settingsIconBlack from '../../assets/settings-icon-black.svg';
import settingsIconWhite from '../../assets/settings-icon-white.svg';

function Sidebar({ theme, collapsed = false, onToggleSidebar }) {
  const { user } = useUser();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      
      <button type="button" className={styles.menuBtn} aria-label="Menu" onClick={onToggleSidebar}>
        <img
          src={theme === 'dark' ? menuWhite : menuBlack}
          alt=""
          aria-hidden="true"
          className={styles.menuIcon}
        />
      </button>

      {collapsed ? (
        <div className={styles.divider} />
      ) : (
        
        <div className={styles.userSection}>
          <div className={styles.avatar}>
            {user.avatar ? (
              <img src={user.avatar} alt="User Avatar" className={styles.avatarImage} />
            ) : (
              <span className={styles.avatarText}>{getInitials(user.name)}</span>
            )}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user.name}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>
      )}

      
      <nav className={styles.nav}>
        
        <NavLink 
          to="/"
          className={({ isActive }) => 
            isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={tasksIconBlack}
                alt=""
                aria-hidden="true"
                className={`${styles.navIcon} ${theme === 'dark' && !isActive ? styles.navIconWhite : ''}`}
              />
              {!collapsed && 'My Tasks'}
            </>
          )}
        </NavLink>

        
        <NavLink 
          to="/settings"
          className={({ isActive }) => 
            isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={
                  theme === 'dark'
                    ? (isActive ? settingsIconBlack : settingsIconWhite)
                    : settingsIconBlack
                }
                alt=""
                aria-hidden="true"
                className={styles.navIcon}
              />
              {!collapsed && 'Settings'}
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
