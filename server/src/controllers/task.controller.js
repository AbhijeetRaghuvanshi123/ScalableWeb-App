import Task from '../models/Task.model.js';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const statusObj = req.query.status && req.query.status !== 'ALL'
      ? { status: req.query.status }
      : {};

    const tasks = await Task.find({ ...keyword, ...statusObj, user: req.user._id }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status, 
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const { title, description, status } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await task.deleteOne();

    res.json({ message: 'Task removed' });
  } catch (error) {
    next(error);
  }
};
