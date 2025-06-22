const request = require('supertest');
const express = require('express');
const todo = require('../routes/todo');
const Task = require('../models/task');

// Mock the Task model
jest.mock('../models/task');

// Set up Express app for testing
const app = express();
app.use(express.json());
app.use('/api/tasks', todo);

describe('Task Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  test('POST /api/tasks - should create a new task', async () => {
    const mockTask = { _id: '1', title: 'Test Task' };
    Task.create.mockResolvedValue(mockTask);

    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' });

    expect(Task.create).toHaveBeenCalledWith({ title: 'Test Task' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockTask);
  });

  test('GET /api/tasks - should return all tasks', async () => {
    const mockTasks = [{ _id: '1', title: 'Task 1' }, { _id: '2', title: 'Task 2' }];
    Task.find.mockResolvedValue(mockTasks);

    const res = await request(app).get('/api/tasks');

    expect(Task.find).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTasks);
  });

  test('PUT /api/tasks/:id - should update a task', async () => {
    const updatedTask = { _id: '1', title: 'Updated Task' };
    Task.findByIdAndUpdate.mockResolvedValue(updatedTask);

    const res = await request(app)
      .put('/api/tasks/1')
      .send({ title: 'Updated Task' });

    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith('1', { title: 'Updated Task' }, { new: true });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedTask);
  });

  test('DELETE /api/tasks/:id - should delete a task', async () => {
    Task.findByIdAndDelete.mockResolvedValue();

    const res = await request(app).delete('/api/tasks/1');

    expect(Task.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Task deleted' });
  });


  test('POST /api/tasks - should return 400 on error', async () => {
    Task.create.mockRejectedValue(new Error('Failed to create task'));

    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Failed to create task');
  });

  test('GET /api/tasks - should return 500 on error', async () => {
    Task.find.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Database error');
  });

  test('PUT /api/tasks/:id - should return 400 on error', async () => {
    Task.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

    const res = await request(app)
      .put('/api/tasks/1')
      .send({ title: 'Updated Task' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Update failed');
  });

  test('DELETE /api/tasks/:id - should return 400 on error', async () => {
    Task.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

    const res = await request(app).delete('/api/tasks/1');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Delete failed');
  });
});

