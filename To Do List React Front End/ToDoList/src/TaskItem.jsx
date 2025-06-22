import React from 'react'

function TaskItem({task, onToggleComplete, onDeleteTask})
{
    return (
        <li
         style = {{
            display: 'flex',
            justifyContent:'space-between',
            allignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #eee',
            backgroundColor:task.completed ? '#e0ffe0' : 'white',

         }}
      >
        <span
        style = {{
            textDecoration: task.completed ? 'line-through' : 'none',
            cursor: 'pointer',
            flexGrow: 1,
        }}
        onClick = {() => onToggleComplete(task._id, task.completed)}
        >
            {task.title}
        </span>
        <button
        onClick = {() => onDeleteTask(task._id)}
        style = {{
            padding: '5px 10 px',
            backgroundColor: '#f44336',
            color:'white',
            border:'none',
            cursor:'pointer',
            marginLeft:'10px',

        }}

         >
            Delete
            </button>
         </li>
    );

}

export default TaskItem;