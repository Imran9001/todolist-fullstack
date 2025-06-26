import React, {useState,useEffect} from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import {fetchTasksAPI,addTaskAPI,updateTaskAPI,deleteTaskAPI} from './Operations'

function App() {
  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasksAPI();
      setTasks(data);
    }
    catch (error){
      console.error("error fetching tasks", error);
      setError("Failed to load tasks. Please try again");

    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
},[]);

  const addTask = async (title) => {
    try{
      const newTask = await addTaskAPI(title);
      setTasks([...tasks,newTask]);
    }
    catch (error)
    {
      console.error("Error adding task", error);
      setError('Failed to add task')
    }
  
  };

  const toggleComplete = async (id, currentCompleted)=>
  {
    try{
      const updatedTask = await updateTaskAPI(id, {completed:!currentCompleted});
      setTasks(tasks.map(task =>
        task._id === id ? updatedTask : task
      ));
    }
    catch(error){
      console.error("Error toggling task completion", error)
      setError('Failed to update task')
    }
  };

  const deleteTask = async (id) => {
    try{
      await deleteTaskAPI(id);
      setTasks(tasks.filter(task => task._id!== id));
    }
    catch(error){
      console.error("Error deleting task", error);
      setError('Failed to delete task')
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>

  return (
    <div style = {{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <h1>To Do List Test AWS</h1>
      <TaskForm onAddTask ={addTask}/>
      <TaskList
      tasks = {tasks}
      onToggleComplete = {toggleComplete}
      onDeleteTask = {deleteTask}
      />
      </div>
  );

}

export default App;

