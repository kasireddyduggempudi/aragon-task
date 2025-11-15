const prisma = require('../config/database');
const logger = require('../config/logger');

// Get all columns for a board
const getColumnsByBoardId = async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const columns = await prisma.column.findMany({
      where: { boardId },
      include: {
        tasks: {
          orderBy: { order: 'asc' },
          include: {
            subtasks: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    logger.info(`Retrieved ${columns.length} columns for board: ${boardId}`);
    res.json(columns);
  } catch (error) {
    next(error);
  }
};

// Get column by ID
const getColumnById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const column = await prisma.column.findUnique({
      where: { id },
      include: {
        tasks: {
          orderBy: { order: 'asc' },
          include: {
            subtasks: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!column) {
      return res.status(404).json({ error: 'Column not found' });
    }

    logger.info(`Retrieved column: ${id}`);
    res.json(column);
  } catch (error) {
    next(error);
  }
};

// Create new column
const createColumn = async (req, res, next) => {
  try {
    const { name, boardId, color = '#635FC7', order = 0 } = req.body;

    // Verify board exists
    const board = await prisma.board.findUnique({ where: { id: boardId } });
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const column = await prisma.column.create({
      data: {
        name,
        boardId,
        color,
        order,
      },
      include: {
        tasks: true,
      },
    });

    logger.info(`Created column: ${column.id}`);
    res.status(201).json(column);
  } catch (error) {
    next(error);
  }
};

// Update column
const updateColumn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, color, order } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (color !== undefined) updateData.color = color;
    if (order !== undefined) updateData.order = order;

    const column = await prisma.column.update({
      where: { id },
      data: updateData,
      include: {
        tasks: {
          orderBy: { order: 'asc' },
          include: {
            subtasks: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    logger.info(`Updated column: ${id}`);
    res.json(column);
  } catch (error) {
    next(error);
  }
};

// Delete column
const deleteColumn = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.column.delete({
      where: { id },
    });

    logger.info(`Deleted column: ${id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getColumnsByBoardId,
  getColumnById,
  createColumn,
  updateColumn,
  deleteColumn,
};
