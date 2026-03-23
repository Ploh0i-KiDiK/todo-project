import React from 'react';
import styles from './TaskFilters.module.css';

const FILTERS = ['all', 'active', 'completed'];

function TaskFilters({ activeFilter, onFilterChange, activeCount }) {
  return (
    <div className={styles.row}>
      <div className={styles.filterGroup}>
        {FILTERS.map((f, i) => (
          <React.Fragment key={f}>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
              onClick={() => onFilterChange(f)}
            >
              
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
            
            {i < FILTERS.length - 1 && (
              <span className={styles.separator}>|</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <span className={styles.counter}>{activeCount} tasks left</span>
    </div>
  );
}

export default TaskFilters;
