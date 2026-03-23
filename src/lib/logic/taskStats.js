export function countActiveTasks(tasks) {
  if (!Array.isArray(tasks)) return 0;
  return tasks.reduce((acc, t) => acc + (t && t.completed === false ? 1 : 0), 0);
}

