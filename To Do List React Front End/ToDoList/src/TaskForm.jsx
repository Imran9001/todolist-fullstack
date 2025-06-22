import React, {useState} from 'react'

function TaskForm({onAddTask})
{
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newTaskTitle.trim())
        {
            alert('Task Title cannot be empty');
            return;
        }

        onAddTask(newTaskTitle);
        setNewTaskTitle('');
    }


    return(
        <form onSubmit = {handleSubmit} style = {{marginBottom: '20px'}}
        data-testid = "form"
        >
        <input
         type = "text"
         placeholder ="Add a new task"
        value = {newTaskTitle}
        onChange = {(e) => setNewTaskTitle(e.target.value)}
        style = {{padding: '8px', marginRight: '10px', width: '300px'}}
        />
         <button type ="submit" style = {{padding: '8px 15px', backgroundColor:'#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
        Add Task
         </button>
        </form>

    );
}
export default TaskForm;

