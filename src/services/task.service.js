
const Task = require('../models/task.model')

const createTask = async (data, userId)=>{
    const task = await Task.create({...data , createdBy: userId});
    return task;
};

const getAllTasks = async (userId, role, query)=> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = role === 'admin' ? {} : {createdBy: userId};

    if(query.status) filter.status = query.status;
    if(query.priority) filter.priority = query.priority;
    
    const sort = {};
    if(query.sortBy) {
        sort[query.sortBy] = query.order === 'asc' ? 1 : -1;
    }
    else{
        sort.createdAt = -1;
    }

    const [tasks , total] = await Promise.all([
        Task.find(filter)
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email')
            .sort(sort)
            .skip(skip)
            .limit(limit),
        Task.countDocuments(filter),
    ]);

    return {
        tasks,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit),
        },
    };
};

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