import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';
import '@testing-library/jest-dom';

describe('TaskForm', () => {
  test('renders input and button', () => {
    render(<TaskForm onAddTask={jest.fn()} />);
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('shows alert and does not call onAddTask when input is empty', () => {
    const onAddTask = jest.fn();
    window.alert = jest.fn();  // mock alert

    render(<TaskForm onAddTask={onAddTask} />);

    fireEvent.submit(screen.getByTestId('form'));

    expect(window.alert).toHaveBeenCalledWith('Task Title cannot be empty');
    expect(onAddTask).not.toHaveBeenCalled();
  });

  test('calls onAddTask and clears input on valid submission', () => {
    const onAddTask = jest.fn();

    render(<TaskForm onAddTask={onAddTask} />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const form = screen.getByTestId('form');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(form);

    expect(onAddTask).toHaveBeenCalledWith('New Task');
    expect(input.value).toBe('');
  });
});
