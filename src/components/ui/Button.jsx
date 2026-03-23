import React from 'react';
import styles from './Button.module.css';

function Button({ children, onClick, variant = 'primary', type = 'button', className = '', ...rest }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
