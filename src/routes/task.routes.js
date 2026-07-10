const express = require('express')
const { create, getAll, getOne, update, remove } = require('../controllers/task.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { createTaskValidator, updateTaskValidator } = require('../validators/task.validator');
const upload = require('../config/multer');
const asyncHandler = require('../utils/asyncHandler');
const Task = require('../models/task.model');

const router = express.Router();

router.use(authenticate);

router.post('/', createTaskValidator, validate, create);
router.get('/', getAll)
router.get('/:id',getOne)
router.put('/:id', updateTaskValidator, validate, update)
router.delete('/:id', remove)

router.post('/:id/attachment',upload.single('file'), asyncHandler(async(req, res)=>{
    if(!req.file){
        return res.status(400).json({ success: false, message: "No file uploaded."});
    };

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
            attachment:{
                filename: req.file.originalname,
                path: req.file.path,
                mimetype: req.file.mimetype,
            },
        },
        {returnDocument: 'after',  new: true}
    );

    res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        data: task,
    });
}));

module.exports = router;
 
