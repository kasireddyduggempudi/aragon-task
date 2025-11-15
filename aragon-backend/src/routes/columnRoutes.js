const express = require('express');
const router = express.Router();
const columnController = require('../controllers/columnController');
const {
  validateColumnCreate,
  validateColumnUpdate,
  validateColumnId,
} = require('../middleware/validators');

// GET /api/columns/:id - Get column by ID
router.get('/:id', validateColumnId, columnController.getColumnById);

// POST /api/columns - Create new column
router.post('/', validateColumnCreate, columnController.createColumn);

// PUT /api/columns/:id - Update column
router.put('/:id', validateColumnId, validateColumnUpdate, columnController.updateColumn);

// DELETE /api/columns/:id - Delete column
router.delete('/:id', validateColumnId, columnController.deleteColumn);

module.exports = router;
