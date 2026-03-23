import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../hooks/UserProvider';
import TasksPage from './TasksPage';

function renderWithRouter(ui) {
  return render(
    <UserProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </UserProvider>
  );
}

function mockFetchOnce(data) {
  global.fetch = jest.fn(async () => ({
    ok: true,
    json: async () => data,
  }));
}

function mockFetchErrorOnce() {
  global.fetch = jest.fn(async () => {
    throw new Error('Network error');
  });
}

describe('TasksPage интеграционные сценарии', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Добавление задачи: ввод + клик "+ Add" → задача появляется', async () => {
    mockFetchOnce([]); 
    const user = userEvent.setup();

    renderWithRouter(<TasksPage />);

    const input = await screen.findByPlaceholderText('Type your task here...');
    await user.type(input, 'Buy milk');
    await user.click(screen.getByRole('button', { name: '+ Add' }));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  test('Фильтрация: All/Active/Completed + "N tasks left" корректны', async () => {
    mockFetchOnce([
      { id: 1, title: 'API active', completed: false },
      { id: 2, title: 'API done', completed: true },
    ]);
    const user = userEvent.setup();

    renderWithRouter(<TasksPage />);

    
    expect(await screen.findByText('API active')).toBeInTheDocument();
    expect(screen.getByText('API done')).toBeInTheDocument();

    
    expect(screen.getByText(/tasks left/i)).toHaveTextContent('1 tasks left');

    await user.click(screen.getByRole('button', { name: 'Active' }));
    expect(screen.getByText('API active')).toBeInTheDocument();
    expect(screen.queryByText('API done')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Completed' }));
    expect(screen.getByText('API done')).toBeInTheDocument();
    expect(screen.queryByText('API active')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('API active')).toBeInTheDocument();
    expect(screen.getByText('API done')).toBeInTheDocument();
  });

  test('Переключение статуса задачи: чекбокс меняет completed и обновляет счётчик', async () => {
    mockFetchOnce([{ id: 1, title: 'One', completed: false }]);
    const user = userEvent.setup();

    renderWithRouter(<TasksPage />);

    expect(await screen.findByText('One')).toBeInTheDocument();
    expect(screen.getByText(/tasks left/i)).toHaveTextContent('1 tasks left');

    
    const task = screen.getByTestId('task-1');
    const checkbox = within(task).getByRole('checkbox', { name: /complete/i });
    await user.click(checkbox);

    expect(within(task).getByText('One')).toHaveClass('completed');
    expect(screen.getByText(/tasks left/i)).toHaveTextContent('0 tasks left');
  });

  test('Редактирование: Edit → меняем текст → Save → новый текст виден', async () => {
    mockFetchOnce([{ id: 1, title: 'Old title', completed: false }]);
    const user = userEvent.setup();

    renderWithRouter(<TasksPage />);

    expect(await screen.findByText('Old title')).toBeInTheDocument();

    const task = screen.getByTestId('task-1');
    await user.click(within(task).getByRole('button', { name: 'Edit' }));

    const editInput = within(task).getByRole('textbox', { name: /edit task/i });
    await user.clear(editInput);
    await user.type(editInput, 'New title');
    await user.click(within(task).getByRole('button', { name: 'Save' }));

    expect(screen.getByText('New title')).toBeInTheDocument();
    expect(screen.queryByText('Old title')).not.toBeInTheDocument();
  });

  test('Удаление: Delete удаляет задачу из списка', async () => {
    mockFetchOnce([{ id: 1, title: 'To delete', completed: false }]);
    const user = userEvent.setup();

    renderWithRouter(<TasksPage />);

    expect(await screen.findByText('To delete')).toBeInTheDocument();
    const task = screen.getByTestId('task-1');
    await user.click(within(task).getByRole('button', { name: 'Delete' }));

    expect(screen.queryByText('To delete')).not.toBeInTheDocument();
  });

  test('Тема: переключатель меняет data-theme и сохраняет в localStorage, затем восстанавливается', async () => {
    mockFetchOnce([]);
    const user = userEvent.setup();

    const { unmount } = renderWithRouter(<TasksPage />);

    const root = await screen.findByTestId('app-root');
    expect(root).toHaveAttribute('data-theme', 'light');

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(root).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    unmount();

    
    mockFetchOnce([]);
    renderWithRouter(<TasksPage />);
    const root2 = await screen.findByTestId('app-root');
    expect(root2).toHaveAttribute('data-theme', 'dark');
  });

  test('JSONPlaceholder: error → показываем сообщение и Retry → повторная загрузка', async () => {
    mockFetchErrorOnce();
    const user = userEvent.setup();

    renderWithRouter(<TasksPage />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    const retry = screen.getByRole('button', { name: 'Retry' });

    
    mockFetchOnce([{ id: 1, title: 'Recovered', completed: false }]);
    await user.click(retry);

    expect(await screen.findByText('Recovered')).toBeInTheDocument();
  });
});

