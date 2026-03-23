import React from 'react';
import styles from './Checkbox.module.css';

function Checkbox({ checked, onChange, label = 'Complete task' }) {
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      aria-label={label}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default Checkbox;
