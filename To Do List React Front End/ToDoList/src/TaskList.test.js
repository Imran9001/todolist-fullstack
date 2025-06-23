import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';
import '@testing-library/jest-dom';


jest.mock('./TaskItem', () => ({ task, onToggleComplete, onDeleteTask }) => (
  <li data-testid="task-item">{task.title}</li>
));

describe('TaskList', () => {
  test('renders "No tasks yet" message when tasks array is empty', () => {
    render(<TaskList tasks={[]} onToggleComplete={jest.fn()} onDeleteTask={jest.fn()} />);
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  test('renders a list of TaskItem components when tasks are provided', () => {
    const tasks = [
      { _id: '1', title: 'Task One', completed: false },
      { _id: '2', title: 'Task Two', completed: true },
    ];

    render(<TaskList tasks={tasks} onToggleComplete={jest.fn()} onDeleteTask={jest.fn()} />);

    
    expect(screen.queryByText(/no tasks yet/i)).not.toBeInTheDocument();

    
    const taskItems = screen.getAllByTestId('task-item');
    expect(taskItems).toHaveLength(tasks.length);

    
    expect(taskItems[0]).toHaveTextContent('Task One');
    expect(taskItems[1]).toHaveTextContent('Task Two');
  });
});
