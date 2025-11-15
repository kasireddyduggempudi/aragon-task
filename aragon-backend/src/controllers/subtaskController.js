const prisma = require('../config/database');
const logger = require('../config/logger');

// Update subtask
const updateSubtask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (isCompleted !== undefined) updateData.isCompleted = isCompleted;

    const subtask = await prisma.subtask.update({
      where: { id },
      data: updateData,
    });

    logger.info(`Updated subtask: ${id}`);
    res.json(subtask);
  } catch (error) {
    next(error);
  }
};

// Delete subtask
const deleteSubtask = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.subtask.delete({
      where: { id },
    });

    logger.info(`Deleted subtask: ${id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateSubtask,
  deleteSubtask,
};
