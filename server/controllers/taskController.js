const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;
  try {
    const task = await Task.create({ title, description, userId });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.userId;
  try {
    const tasks = await Task.findAll({ where: { userId, isDeleted: false } });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findOne({ where: { id, userId: req.userId, isDeleted: false } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, userId: req.userId, isDeleted: false } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.isDeleted = true;
    await task.save();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
