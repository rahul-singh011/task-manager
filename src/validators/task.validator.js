const { body } = require("express-validator");

const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("status").optional().isIn(["todo", "in-progress", "completed"]).withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),

  body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
];

const updateTaskValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("status")
    .optional()
    .isIn(["todo", "in-progress", "completed"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),

  body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
];

module.exports = { createTaskValidator, updateTaskValidator };
