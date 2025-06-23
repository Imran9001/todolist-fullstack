// App.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

// Mock the API operations module
jest.mock('./Operations', () => ({
  fetchTasksAPI: jest.fn(),
  addTaskAPI: jest.fn(),
  updateTaskAPI: jest.fn(),
  deleteTaskAPI: jest.fn(),
}));

import { fetchTasksAPI, addTaskAPI, updateTaskAPI, deleteTaskAPI } from './Operations';

describe('App Component', () => {
  const mockTasks = [
    { _id: '1', title: 'Task One', completed: false },
    { _id: '2', title: 'Task Two', completed: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays tasks on mount', async () => {
    fetchTasksAPI.mockResolvedValue(mockTasks);

    render(<App />);

    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();

    // Wait for tasks to be displayed
    await waitFor(() => {
      expect(screen.getByText('Task One')).toBeInTheDocument();
      expect(screen.getByText('Task Two')).toBeInTheDocument();
    });
  });

  test('displays error message when fetchTasksAPI fails', async () => {
    fetchTasksAPI.mockRejectedValue(new Error('Fetch failed'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load tasks/i)).toBeInTheDocument();
    });
  });

  test('adds a new task when TaskForm submits', async () => {
    fetchTasksAPI.mockResolvedValue(mockTasks);
    const newTask = { _id: '3', title: 'New Task', completed: false };
    addTaskAPI.mockResolvedValue(newTask);

    render(<App />);

    // Wait for tasks to load
    await waitFor(() => screen.getByText('Task One'));

    // Simulate user typing and submitting a new task
    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    // Wait for new task to appear
    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('toggles task completion when TaskItem is clicked', async () => {
    fetchTasksAPI.mockResolvedValue(mockTasks);

    const updatedTask = { ...mockTasks[0], completed: true };
    updateTaskAPI.mockResolvedValue(updatedTask);

    render(<App />);

    await waitFor(() => screen.getByText('Task One'));

    // Click on the first task to toggle complete
    fireEvent.click(screen.getByText('Task One'));

    await waitFor(() => {
      // The task should now have line-through style, indicating completed
      const taskElement = screen.getByText('Task One');
      expect(taskElement).toHaveStyle('text-decoration: line-through');
    });
  });

  test('deletes a task when delete button is clicked', async () => {
    fetchTasksAPI.mockResolvedValue(mockTasks);
    deleteTaskAPI.mockResolvedValue();

    render(<App />);

    await waitFor(() => screen.getByText('Task One'));

    // Find the delete button for Task One 
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Task One')).not.toBeInTheDocument();
    });
  });

  test('displays error message if adding task fails', async () => {
    fetchTasksAPI.mockResolvedValue(mockTasks);
    addTaskAPI.mockRejectedValue(new Error('Add failed'));

    render(<App />);

    await waitFor(() => screen.getByText('Task One'));

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Fail Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to add task/i)).toBeInTheDocument();
    });
  });

  test('displays error message if toggling task fails', async () => {
    fetchTasksAPI.mockResolvedValue(mockTasks);
    updateTaskAPI.mockRejectedValue(new Error('Update failed'));

    render(<App />);

    await waitFor(() => screen.getByText('Task One'));

    fireEvent.click(screen.getByText('Task One'));

    await waitFor(() => {
      expect(screen.getByText(/failed to update task/i)).toBeInTheDocument();
    });
  });

  test('displays error message if deleting task fails', async () => {
    fetchTasksAPI.mockResolvedValue(mockTasks);
    deleteTaskAPI.mockRejectedValue(new Error('Delete failed'));

    render(<App />);

    await waitFor(() => screen.getByText('Task One'));

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/failed to delete task/i)).toBeInTheDocument();
    });
  });
});
