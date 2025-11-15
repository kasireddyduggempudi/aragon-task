const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {
  validateTaskCreate,
  validateTaskUpdate,
  validateTaskId,
} = require('../middleware/validators');

// GET /api/tasks/:id - Get task by ID
router.get('/:id', validateTaskId, taskController.getTaskById);

// POST /api/tasks - Create new task
router.post('/', validateTaskCreate, taskController.createTask);

// PUT /api/tasks/:id - Update task
router.put('/:id', validateTaskId, validateTaskUpdate, taskController.updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', validateTaskId, taskController.deleteTask);

module.exports = router;
