/// <reference types="vitest" />
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import App from './App';

// Мокируем модуль delay
vi.mock('./utils/delay', () => ({
  default: vi.fn().mockResolvedValue([
    { id: 1, title: 'Тестовое задание', isDone: false },
    { id: 2, title: 'Прекрасный код', isDone: true },
    { id: 3, title: 'Покрытие тестами', isDone: false }
  ])
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает загрузку и затем задачи', async () => {
    render(<App />);

    // Проверяем состояние загрузки
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();

    // Ждем появления задач
    await waitFor(
      () => {
        expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
        expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
        expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('добавляет новую задачу', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Ждем загрузки начальных задач
    await waitFor(() => {
      expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Добавить');

    await user.type(input, 'Новая задача');
    await user.click(button);

    expect(screen.getByText('Новая задача')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('переключает статус задачи', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    });

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('фильтрует задачи', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    });

    const activeButton = screen.getByText('Active');
    const completedButton = screen.getByText('Completed');

    // Проверяем Active
    await user.click(activeButton);
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
    expect(screen.queryByText('Прекрасный код')).not.toBeInTheDocument();

    // Проверяем Completed
    await user.click(completedButton);
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
    expect(screen.queryByText('Тестовое задание')).not.toBeInTheDocument();
    expect(screen.queryByText('Покрытие тестами')).not.toBeInTheDocument();
  });

  it('очищает выполненные задачи', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
    });

    const clearButton = screen.getByText('Clear Completed');
    await user.click(clearButton);

    expect(screen.queryByText('Прекрасный код')).not.toBeInTheDocument();
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
  });

  it('показывает счетчик активных задач', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    });

    expect(screen.getByText('2 items left')).toBeInTheDocument();

    // Отмечаем одну задачу выполненной
    const checkbox = screen.getAllByRole('checkbox')[0];
    await user.click(checkbox);

    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });
});
