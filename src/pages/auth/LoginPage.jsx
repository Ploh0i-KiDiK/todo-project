import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import styles from './AuthForms.module.css';

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/');
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your details to access your tasks"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
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
          <input 
            type="password" 
            id="password" 
            className={styles.input} 
            placeholder="••••••••"
            required
          />
        </div>

        <div className={styles.actions}>
          <Button variant="primary" type="submit" className={styles.submitBtn}>
            Sign In
          </Button>
        </div>

        <p className={styles.footerText}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.link}>Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
