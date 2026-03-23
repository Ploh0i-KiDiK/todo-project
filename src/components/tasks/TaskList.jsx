import React from 'react';
import styles from './TaskList.module.css';
import TaskItem from './TaskItem';

function TaskList({ tasks, theme, onToggle, onDelete, onSave }) {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          theme={theme}
          onToggle={onToggle}
          onDelete={onDelete}
          onSave={(newTitle) => onSave(task.id, newTitle)}
        />
      ))}
    </ul>
  );
}

export default TaskList;
