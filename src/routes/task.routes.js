const express = require('express')
const { create, getAll, getOne, update, remove } = require('../controllers/task.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { createTaskValidator, updateTaskValidator } = require('../validators/task.validator');

const router = express.Router();

router.use(authenticate);

router.post('/', createTaskValidator, validate, create);
router.get('/', getAll)
router.get('/:id',getOne)
router.put('/:id', updateTaskValidator, validate, update)
router.delete('/:id', remove)

module.exports = router;
 
