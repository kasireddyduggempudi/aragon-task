const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');
const {
  validateSubtaskUpdate,
  validateSubtaskId,
} = require('../middleware/validators');

// PUT /api/subtasks/:id - Update subtask
router.put('/:id', validateSubtaskId, validateSubtaskUpdate, subtaskController.updateSubtask);

// DELETE /api/subtasks/:id - Delete subtask
router.delete('/:id', validateSubtaskId, subtaskController.deleteSubtask);

module.exports = router;
