const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation error',
      details: errors.array(),
    });
  }
  next();
};

// Board validators
const validateBoardCreate = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Board name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Board name must be between 1 and 100 characters'),
  body('columns')
    .optional()
    .isArray()
    .withMessage('Columns must be an array'),
  body('columns.*.name')
    .if(body('columns').exists())
    .trim()
    .notEmpty()
    .withMessage('Column name is required'),
  body('columns.*.color')
    .if(body('columns').exists())
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color must be a valid hex color'),
  validate,
];

const validateBoardUpdate = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Board name cannot be empty')
    .isLength({ min: 1, max: 100 })
    .withMessage('Board name must be between 1 and 100 characters'),
  validate,
];

const validateBoardId = [
  param('id').isUUID().withMessage('Invalid board ID'),
  validate,
];

// Column validators
const validateColumnCreate = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Column name is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Column name must be between 1 and 50 characters'),
  body('boardId')
    .notEmpty()
    .withMessage('Board ID is required')
    .isUUID()
    .withMessage('Invalid board ID'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color must be a valid hex color'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  validate,
];

const validateColumnUpdate = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Column name cannot be empty')
    .isLength({ min: 1, max: 50 })
    .withMessage('Column name must be between 1 and 50 characters'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color must be a valid hex color'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  validate,
];

const validateColumnId = [
  param('id').isUUID().withMessage('Invalid column ID'),
  validate,
];

// Task validators
const validateTaskCreate = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Task title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('columnId')
    .notEmpty()
    .withMessage('Column ID is required')
    .isUUID()
    .withMessage('Invalid column ID'),
  body('subtasks')
    .optional()
    .isArray()
    .withMessage('Subtasks must be an array'),
  body('subtasks.*.title')
    .if(body('subtasks').exists())
    .trim()
    .notEmpty()
    .withMessage('Subtask title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Subtask title must be between 1 and 200 characters'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  validate,
];

const validateTaskUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Task title cannot be empty')
    .isLength({ min: 1, max: 200 })
    .withMessage('Task title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('columnId')
    .optional()
    .isUUID()
    .withMessage('Invalid column ID'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  validate,
];

const validateTaskId = [
  param('id').isUUID().withMessage('Invalid task ID'),
  validate,
];

// Subtask validators
const validateSubtaskUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Subtask title cannot be empty')
    .isLength({ min: 1, max: 200 })
    .withMessage('Subtask title must be between 1 and 200 characters'),
  body('isCompleted')
    .optional()
    .isBoolean()
    .withMessage('isCompleted must be a boolean'),
  validate,
];

const validateSubtaskId = [
  param('id').isUUID().withMessage('Invalid subtask ID'),
  validate,
];

module.exports = {
  validateBoardCreate,
  validateBoardUpdate,
  validateBoardId,
  validateColumnCreate,
  validateColumnUpdate,
  validateColumnId,
  validateTaskCreate,
  validateTaskUpdate,
  validateTaskId,
  validateSubtaskUpdate,
  validateSubtaskId,
};
