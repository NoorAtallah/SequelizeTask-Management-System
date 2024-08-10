import React, { useState } from 'react';
import taskService from '../../services/taskService';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: task.title, description: task.description, status: task.status });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await taskService.updateTask(task.id, formData);
      setIsEditing(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(task.id);
      window.location.reload(); // Reload to reflect the deletion
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
