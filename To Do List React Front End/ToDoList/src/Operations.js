const axios = require('axios');

const API_BACKEND_URL = "https://api.todolist.it.com/todo";

 const fetchTasksAPI = async () => {
    const response = await axios.get(API_BACKEND_URL);
    return response.data;  
};

 const addTaskAPI = async (title) => {
    const response = await axios.post(API_BACKEND_URL, {title});
    return response.data;
};

 const updateTaskAPI = async(id, update) => {
    const response = await axios.put(`${API_BACKEND_URL}/${id}`, update);
    return response.data;
}

 const deleteTaskAPI = async(id) => {
    const response = await axios.delete(`${API_BACKEND_URL}/${id}`);
    return response.data;
};

module.exports = {
    fetchTasksAPI,
    addTaskAPI,
    updateTaskAPI,
    deleteTaskAPI
};
