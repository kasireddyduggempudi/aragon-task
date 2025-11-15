const prisma = require('../config/database');
const logger = require('../config/logger');

// Get all boards
const getAllBoards = async (req, res, next) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        columns: {
          orderBy: { order: 'asc' },
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
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    logger.info(`Retrieved ${boards.length} boards`);
    res.json(boards);
  } catch (error) {
    next(error);
  }
};

// Get board by ID
const getBoardById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { order: 'asc' },
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
        },
      },
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    logger.info(`Retrieved board: ${id}`);
    res.json(board);
  } catch (error) {
    next(error);
  }
};

// Create new board
const createBoard = async (req, res, next) => {
  try {
    const { name, columns = [] } = req.body;

    const board = await prisma.board.create({
      data: {
        name,
        columns: {
          create: columns.map((col, index) => ({
            name: col.name,
            color: col.color || '#635FC7',
            order: col.order !== undefined ? col.order : index,
          })),
        },
      },
      include: {
        columns: {
          orderBy: { order: 'asc' },
        },
      },
    });

    logger.info(`Created board: ${board.id}`);
    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

// Update board
const updateBoard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const board = await prisma.board.update({
      where: { id },
      data: { name },
      include: {
        columns: {
          orderBy: { order: 'asc' },
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
        },
      },
    });

    logger.info(`Updated board: ${id}`);
    res.json(board);
  } catch (error) {
    next(error);
  }
};

// Delete board
const deleteBoard = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.board.delete({
      where: { id },
    });

    logger.info(`Deleted board: ${id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
