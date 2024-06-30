const mongoose = require("mongoose");

const UserTodoTask =  new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const TodoTask = mongoose.model('TodoTask', UserTodoTask);
module.exports = TodoTask;