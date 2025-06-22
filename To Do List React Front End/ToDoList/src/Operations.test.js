const axios = require('axios');
const {
  fetchTasksAPI,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI
} = require('./Operations');

jest.mock('axios');

describe('API Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchTasksAPI - should fetch tasks', async () => {
    const mockData = [{ _id: '1', title: 'Task 1' }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await fetchTasksAPI();
    expect(axios.get).toHaveBeenCalledWith('https://api.todolist.it.com/todo');
    expect(result).toEqual(mockData);
  });

  test('addTaskAPI - should add a new task', async () => {
    const mockData = { _id: '2', title: 'New Task' };
    axios.post.mockResolvedValue({ data: mockData });

    const result = await addTaskAPI('New Task');
    expect(axios.post).toHaveBeenCalledWith('https://api.todolist.it.com/todo', { title: 'New Task' });
    expect(result).toEqual(mockData);
  });

  test('updateTaskAPI - should update a task', async () => {
    const mockData = { _id: '3', title: 'Updated Task' };
    axios.put.mockResolvedValue({ data: mockData });

    const result = await updateTaskAPI('3', { title: 'Updated Task' });
    expect(axios.put).toHaveBeenCalledWith('https://api.todolist.it.com/todo/3', { title: 'Updated Task' });
    expect(result).toEqual(mockData);
  });

  test('deleteTaskAPI - should delete a task', async () => {
    axios.delete.mockResolvedValue({ data: { message: 'Deleted' } });

    const result = await deleteTaskAPI('4');
    expect(axios.delete).toHaveBeenCalledWith('https://api.todolist.it.com/todo/4');
    expect(result).toEqual({ message: 'Deleted' });
  });

});



