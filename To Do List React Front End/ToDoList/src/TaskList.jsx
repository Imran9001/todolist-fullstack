import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        ))
      )}
    </ul>
  );
}

export default TaskList;