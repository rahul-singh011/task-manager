
const Task = require('../models/task.model')

const createTask = async (data, userId)=>{
    const task = await Task.create({...data , createdBy: userId});
    return task;
};

const getAllTasks = async (userId, role)=> {
    const filter = role === 'admin'? {} : {createdBy: userId};
    const tasks = await Task.find(filter)
        .populate('createdBy', 'name email')
        .populate('assignedTo', 'name email')
        .sort({createdAt: -1})
    return tasks;  
}

const getTaskById = async (taskId, userId, role)=>{
    const task = await Task.findById(taskId)
        .populate('createdBy', 'name email')
        .populate('assignedTo', 'name email')
    
    if(!task) throw new Error("Task not found")
    
    if(role !== 'admin' && task.createdBy._id.toString() !== userId){
        throw new Error("Access denied")
    }

    return task;
};

const updateTask = async(taskId, data, userId, role)=>{
    const task = await Task.findById(taskId);
    if(!task) throw new Error("Task not found")

    if(role !== 'admin' && task.createdBy.toString() !== userId){
        throw new Error("Access denied")
    };

    const updated = await Task.findByIdAndUpdate(taskId, data, {
        returnDocument: 'after',
        runValidators: true
    });

    return updated;
};

const deleteTask = async(taskId, userId, role)=>{
    const task = await Task.findById(taskId);
    if(!task) throw new Error("Task not found")
    
    if(role !== 'admin' && task.createdBy.toString() !== userId){
        throw new Error("Access denied")
    };

    await Task.findByIdAndDelete(taskId);

    return {
        message: "Task  deleted successfully"
    }
};

module.exports = {createTask , getAllTasks , getTaskById , updateTask , deleteTask};