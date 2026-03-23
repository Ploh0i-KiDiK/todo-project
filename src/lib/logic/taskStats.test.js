import { countActiveTasks } from './taskStats';

describe('countActiveTasks(tasks)', () => {
  test('returns correct number for mixed tasks', () => {
    const tasks = [
      { id: '1', title: 'A', completed: false },
      { id: '2', title: 'B', completed: true },
      { id: '3', title: 'C', completed: false },
    ];

    expect(countActiveTasks(tasks)).toBe(2);
  });

  test('returns 0 for empty list', () => {
    expect(countActiveTasks([])).toBe(0);
  });
});

