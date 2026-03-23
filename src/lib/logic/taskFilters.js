export function filterTasks(tasks, filter) {
  if (!Array.isArray(tasks)) return [];

  switch (filter) {
    case 'active':
      return tasks.filter((t) => t && t.completed === false);
    case 'completed':
      return tasks.filter((t) => t && t.completed === true);
    case 'all':
    default:
      return tasks;
  }
}

