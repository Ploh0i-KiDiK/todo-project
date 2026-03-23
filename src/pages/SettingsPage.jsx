import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';
import ToggleTheme from '../components/ui/ToggleTheme';
import { useTheme } from '../hooks/useTheme';
import { useUser } from '../hooks/useUser';
import styles from './SettingsPage.module.css';

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [sidebarMode, setSidebarMode] = useState('expanded'); 

  
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ name, email });
    alert('Settings saved!');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large (max 2MB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result }); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    
    navigate('/login');
  };

  const getInitials = (n) => {
    if (!n) return 'U';
    return n.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <MainLayout
      theme={theme}
      topRight={<ToggleTheme theme={theme} onToggle={toggleTheme} />}
      sidebarMode={sidebarMode}
      sidebar={(
        <Sidebar
          theme={theme}
          collapsed={sidebarMode === 'collapsed'}
          onToggleSidebar={() => setSidebarMode((m) => (m === 'expanded' ? 'collapsed' : 'expanded'))}
        />
      )}
    >
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Profile Information</h2>
        
        <div className={styles.avatarSection}>
          <label htmlFor="avatar-upload" className={styles.avatarUploadWrapper}>
            <div className={styles.avatarPreview}>
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar Preview" className={styles.avatarImage} />
              ) : (
                <span className={styles.avatarText}>{getInitials(user.name)}</span>
              )}
              <div className={styles.avatarOverlay}>
                <span>Change</span>
              </div>
            </div>
          </label>
          <input 
            type="file" 
            id="avatar-upload" 
            accept="image/png, image/jpeg, image/jpg" 
            className={styles.hiddenInput} 
            onChange={handleAvatarChange} 
          />
          <div className={styles.avatarInfo}>
            <span className={styles.avatarLabel}>Upload new avatar</span>
            <span className={styles.avatarHint}>JPG, PNG max 2MB</span>
          </div>
        </div>

        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input 
              type="text" 
              id="name" 
              className={styles.input} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input 
              type="email" 
              id="email" 
              className={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.actions}>
            <Button variant="primary" type="submit" className={styles.saveBtn}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Account Actions</h2>
        <p className={styles.description}>
          Log out of your account on this device.
        </p>
        <Button variant="danger" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </MainLayout>
  );
}

export default SettingsPage;
