import React, { useState } from 'react';
import styles from './TaskItem.module.css';
import Checkbox from '../ui/Checkbox';
import pencilBlack from '../../assets/pencil-icon-black.svg';
import pencilWhite from '../../assets/pencil-icon-white.svg';
import trashBlack from '../../assets/trash-icon-black.svg';
import trashWhite from '../../assets/trash-icon-white.svg';

function TaskItem({ task, theme = 'light', onToggle, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  function handleStartEdit() {
    setEditValue(task.title);
    setIsEditing(true);
  }

  function handleSave() {
    const trimmed = editValue.trim();
    if (trimmed) onSave(trimmed);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditValue(task.title);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className={styles.item}
      data-testid={`task-${task.id}`}
    >
      <Checkbox
        checked={!!task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        
        <>
          <input
            type="text"
            aria-label="Edit task"
            className={styles.editInput}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button type="button" className={styles.actionBtn} onClick={handleSave} aria-label="Save">
            Save
          </button>
          <button type="button" className={styles.actionBtn} onClick={handleCancel} aria-label="Cancel">
            Cancel
          </button>
        </>
      ) : (
        
        <>
          <span className={`${styles.title} ${task.completed ? styles.completed : ''}`}>
            {task.title}
          </span>

          
          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleStartEdit}
            aria-label="Edit"
          >
            <img
              src={theme === 'dark' ? pencilWhite : pencilBlack}
              alt=""
              aria-hidden="true"
              className={styles.icon}
            />
          </button>

          
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onDelete(task.id)}
            aria-label="Delete"
          >
            <img
              src={theme === 'dark' ? trashWhite : trashBlack}
              alt=""
              aria-hidden="true"
              className={styles.icon}
            />
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
