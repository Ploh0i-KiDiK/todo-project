import React from 'react';
import styles from './EmptyState.module.css';
import selfieSvg from '../../assets/selfie 1.svg';

function EmptyState({ message }) {
  return (
    <div className={styles.wrapper}>
      
      <div className={styles.illustration}>
        <img src={selfieSvg} alt="No tasks illustration" className={styles.svg} />
      </div>
      <div className={styles.text}>
        <p className={styles.line1}>
          {message || 'Empty as my motivation on Monday 😅.'}
        </p>
        <p className={styles.line2}>Let&apos;s start adding stuff!</p>
      </div>
    </div>
  );
}

export default EmptyState;
