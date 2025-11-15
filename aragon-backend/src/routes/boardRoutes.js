const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const {
  validateBoardCreate,
  validateBoardUpdate,
  validateBoardId,
} = require('../middleware/validators');

// GET /api/boards - Get all boards
router.get('/', boardController.getAllBoards);

// GET /api/boards/:id - Get board by ID
router.get('/:id', validateBoardId, boardController.getBoardById);

// POST /api/boards - Create new board
router.post('/', validateBoardCreate, boardController.createBoard);

// PUT /api/boards/:id - Update board
router.put('/:id', validateBoardId, validateBoardUpdate, boardController.updateBoard);

// DELETE /api/boards/:id - Delete board
router.delete('/:id', validateBoardId, boardController.deleteBoard);

module.exports = router;
