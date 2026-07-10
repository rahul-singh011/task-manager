const asyncHandler = require("../utils/asyncHandler");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../services/task.service");

const create = asyncHandler(async (req, res) => {
  const task = await createTask(req.body, req.user.id);
  res.status(200).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const result = await getAllTasks(req.user.id, req.user.role, req.query);
  res.status(200).json({
    success: true,
    message: "All tasks fetched successfully",
    data: result.tasks,
    pagination: result.pagination,
  });
});

const getOne = asyncHandler(async (req, res) => {
  const task = await getTaskById(req.params.id, req.user.id, req.user.role);
  res.status(200).json({
    success: true,
    message: "Task fetched successfully",
    data: task,
  });
});

const update = asyncHandler(async (req, res) => {
  const task = await updateTask(
    req.params.id,
  req.body,
  req.user.id,
  req.user.role,
  );
  res.status(200).json({
    success: true,
    message: "Tasks updated",
    data: task,
  });
});

const remove = asyncHandler(async (req, res) => {
  const result = await deleteTask(req.params.id, req.user.id, req.user.role);
  res.status(200).json({ success: true, message: result.message });
});

module.exports = { create, getAll, getOne, update, remove };
