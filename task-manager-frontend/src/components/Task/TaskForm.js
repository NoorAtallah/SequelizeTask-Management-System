import React, { useState } from 'react';
import taskService from '../../services/taskService';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await taskService.createTask(formData);
      onTaskCreated(newTask);
      setFormData({ title: '', description: '' });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Task Title" onChange={handleChange} />
      <textarea name="description" placeholder="Task Description" onChange={handleChange}></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
