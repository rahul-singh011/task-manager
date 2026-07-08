
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters.'],
    },

    description:{
        type: String,
        trim: true,
        maxlength: [500 , 'Description cannot exceed 500 characters'],
    },

    status:{
        type: String,
        enum: ['todo', 'in-progress', 'completed'],
        default: 'todo',
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },

    dueDate:{
        type: Date,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
},
{
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;