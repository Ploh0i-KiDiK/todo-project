import { filterTasks } from './taskFilters';

describe('filterTasks(tasks, filter)', () => {
  const tasks = [
    { id: '1', title: 'A', completed: false },
    { id: '2', title: 'B', completed: true },
    { id: '3', title: 'C', completed: false },
  ];

  test("filter = 'all' returns all tasks", () => {
    expect(filterTasks(tasks, 'all')).toEqual(tasks);
  });

  test("filter = 'active' returns only completed === false", () => {
    expect(filterTasks(tasks, 'active')).toEqual([
      { id: '1', title: 'A', completed: false },
      { id: '3', title: 'C', completed: false },
    ]);
  });

  test("filter = 'completed' returns only completed === true", () => {
    expect(filterTasks(tasks, 'completed')).toEqual([
      { id: '2', title: 'B', completed: true },
    ]);
  });

  test("unknown filter behaves like 'all'", () => {
    expect(filterTasks(tasks, 'wat')).toEqual(tasks);
  });
});

