import React from 'react';
import styles from './TaskInput.module.css';
import Button from '../ui/Button';

function TaskInput({ value, onChange, onAdd, error }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') onAdd();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <input
          type="text"
          placeholder="Type your task here..."
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
        <Button onClick={onAdd} variant="primary" className={styles.addBtn}>
          + Add
        </Button>
      </div>
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
}

export default TaskInput;
