import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import styles from './AuthForms.module.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordError = (value) => {
    const v = String(value || '');
    if (v.length === 0) return 'Password is required.';
    if (/\s/.test(v)) return 'Password must not contain spaces.';
    
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
    if (!strong) return 'Password must be 8+ chars and include A-Z, a-z, and a number.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = getPasswordError(password);
    if (err) {
      setPasswordError(err);
      return;
    }
    setPasswordError('');
    
    navigate('/');
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Start managing your tasks today"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input 
            type="text" 
            id="name" 
            className={styles.input} 
            placeholder="Jane Doe"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input 
            type="email" 
            id="email" 
            className={styles.input} 
            placeholder="janedoe@gmail.com"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <div className={styles.passwordRow}>
            <input 
              type={showPassword ? 'text' : 'password'}
              id="password" 
              className={`${styles.input} ${styles.passwordInput} ${passwordError ? styles.inputError : ''}`}
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              onBlur={(e) => {
                const err = getPasswordError(e.target.value);
                setPasswordError(err);
              }}
            />
            <button
              type="button"
              className={styles.togglePasswordBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
        </div>

        <div className={styles.actions}>
          <Button variant="primary" type="submit" className={styles.submitBtn}>
            Sign Up
          </Button>
        </div>

        <p className={styles.footerText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
