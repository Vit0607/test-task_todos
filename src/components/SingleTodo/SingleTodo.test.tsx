/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import SingleTodo from './SingleTodo';

describe('SingleTodo Component', () => {
  it('отображает задачу и корректно реагирует на клики', async () => {
    const mockToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <SingleTodo
        id={1}
        title="Тестовая задача"
        isDone={false}
        toggleIsDone={mockToggle}
      />
    );

    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(mockToggle).toHaveBeenCalledWith(1, true);
  });

  it('показывает выполненную задачу', () => {
    const mockToggle = vi.fn();

    render(
      <SingleTodo
        id={2}
        title="Выполненная задача"
        isDone={true}
        toggleIsDone={mockToggle}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
