import React, { useState, useCallback } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../hooks/useTheme';
import MainLayout from '../components/layout/MainLayout';
import Sidebar from '../components/layout/Sidebar';
import TaskInput from '../components/tasks/TaskInput';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import EmptyState from '../components/tasks/EmptyState';
import ToggleTheme from '../components/ui/ToggleTheme';
import styles from './TasksPage.module.css';

function TasksPage() {
  const { theme, toggleTheme } = useTheme();
  const [sidebarMode, setSidebarMode] = useState('expanded'); 
  const {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    activeCount,
    isLoading,
    error,
    loadFromApi,
    addTask,
    toggleTask,
    deleteTask,
    saveTask,
  } = useTasks();

  
  
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAdd = useCallback(() => {
    const title = inputValue.trim();
    if (!title) {
      setInputError('Please enter a task description.');
      return;
    }
    addTask(title);
    setInputValue('');
    setInputError('');
  }, [inputValue, addTask]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
    
    if (inputError && e.target.value.trim()) {
      setInputError('');
    }
  }, [inputError]);

  
  const showGlobalEmpty = tasks.length === 0 && !isLoading && !error;
  
  const showFilteredEmpty = tasks.length > 0 && filteredTasks.length === 0 && !isLoading;

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
      <div className={styles.container}>
        
        <h1 className={styles.title}>My Tasks</h1>

        
        <TaskInput
          value={inputValue}
          onChange={handleInputChange}
          onAdd={handleAdd}
          error={inputError}
        />

        
        {tasks.length > 0 && !isLoading && (
          <TaskFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
          />
        )}

        
        {isLoading && (
          <div className={styles.loading}>Loading tasks...</div>
        )}

        
        {error && (
          <div className={styles.error}>
            <p>Something went wrong. Please try again.</p>
            <button type="button" onClick={loadFromApi} className={styles.retryBtn}>
              Retry
            </button>
          </div>
        )}

        
        {showGlobalEmpty && <EmptyState />}

        
        {showFilteredEmpty && (
          <div className={styles.filteredEmpty}>
            No tasks in this view yet.
          </div>
        )}

        
        {!isLoading && filteredTasks.length > 0 && (
          <TaskList
            tasks={filteredTasks}
            theme={theme}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onSave={saveTask}
          />
        )}

      </div>

      
      <footer className={styles.footer}>© 2025</footer>
    </MainLayout>
  );
}

export default TasksPage;
