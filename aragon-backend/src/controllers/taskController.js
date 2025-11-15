const prisma = require('../config/database');
const logger = require('../config/logger');

// Get all tasks for a column
const getTasksByColumnId = async (req, res, next) => {
  try {
    const { columnId } = req.params;

    const tasks = await prisma.task.findMany({
      where: { columnId },
      include: {
        subtasks: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    logger.info(`Retrieved ${tasks.length} tasks for column: ${columnId}`);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get task by ID
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        subtasks: {
          orderBy: { order: 'asc' },
        },
        column: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    logger.info(`Retrieved task: ${id}`);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Create new task
const createTask = async (req, res, next) => {
  try {
    const { title, description, columnId, subtasks = [], order = 0 } = req.body;

    // Verify column exists
    const column = await prisma.column.findUnique({ where: { id: columnId } });
    if (!column) {
      return res.status(404).json({ error: 'Column not found' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        columnId,
        order,
        subtasks: {
          create: subtasks.map((subtask, index) => ({
            title: subtask.title,
            isCompleted: subtask.isCompleted || false,
            order: subtask.order !== undefined ? subtask.order : index,
          })),
        },
      },
      include: {
        subtasks: {
          orderBy: { order: 'asc' },
        },
      },
    });

    logger.info(`Created task: ${task.id}`);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Update task
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, columnId, order } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (columnId !== undefined) {
      // Verify column exists
      const column = await prisma.column.findUnique({ where: { id: columnId } });
      if (!column) {
        return res.status(404).json({ error: 'Column not found' });
      }
      updateData.columnId = columnId;
    }
    if (order !== undefined) updateData.order = order;

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        subtasks: {
          orderBy: { order: 'asc' },
        },
      },
    });

    logger.info(`Updated task: ${id}`);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Delete task
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    logger.info(`Deleted task: ${id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasksByColumnId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
