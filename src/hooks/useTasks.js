import { useState, useEffect, useCallback, useMemo } from 'react';
import { filterTasks } from '../lib/logic/taskFilters';
import { countActiveTasks } from '../lib/logic/taskStats';
import { loadTasks, saveTasks } from '../lib/storage/tasksStorage';
import { fetchTodos } from '../lib/api/todosApi';

export function useTasks() {
  
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  
  const loadFromApi = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiTasks = await fetchTodos(10);
      setTasks((current) => {
        
        const localOnly = current.filter(
          (t) => typeof t.id === 'string' && t.id.startsWith('local-')
        );

        
        const merged = new Map();
        for (const t of [...localOnly, ...apiTasks]) {
          merged.set(t.id, t);
        }
        return Array.from(merged.values());
      });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  
  useEffect(() => {
    loadFromApi();
  }, [loadFromApi]);

  const addTask = useCallback((title) => {
    const newTask = {
      
      id: `local-${Date.now()}`,
      title,
      completed: false,
    };
    
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const saveTask = useCallback((taskId, newTitle) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t))
    );
  }, []);

  
  const filteredTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
  const activeCount = useMemo(() => countActiveTasks(tasks), [tasks]);

  return {
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
  };
}
