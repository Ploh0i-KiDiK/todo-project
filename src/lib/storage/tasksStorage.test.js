import { loadTasks, saveTasks } from './tasksStorage';

describe('tasksStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveTasks saves tasks array as JSON', () => {
    const tasks = [{ id: '1', title: 'A', completed: false }];
    saveTasks(tasks);
    expect(localStorage.getItem('tasks')).toBe(JSON.stringify(tasks));
  });

  test('loadTasks returns saved array', () => {
    const tasks = [
      { id: '1', title: 'A', completed: false },
      { id: '2', title: 'B', completed: true },
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    expect(loadTasks()).toEqual(tasks);
  });

  test('loadTasks returns empty array if key missing', () => {
    expect(loadTasks()).toEqual([]);
  });

  test('loadTasks returns empty array if JSON invalid', () => {
    localStorage.setItem('tasks', '{not json');
    expect(loadTasks()).toEqual([]);
  });

  test('loadTasks returns empty array if parsed value is not an array', () => {
    localStorage.setItem('tasks', JSON.stringify({ hello: 'world' }));
    expect(loadTasks()).toEqual([]);
  });
});

