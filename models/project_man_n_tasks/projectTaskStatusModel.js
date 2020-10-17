/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectTaskStatusSchema = new Schema({    
    _id:{type:mongoose.ObjectId},
    status:{type:String},
    deadlineNotified:{type:Boolean},
    kanbanOrder:{type:Number},
    milestoneOrder:{type:Number},
    _taskId:{type:mongoose.ObjectId},
    _projectId:{type:mongoose.ObjectId},
    _userId:{type:mongoose.ObjectId},
    progress:{type:Number}
});

/* MODEL */
const ProjectTaskStatus = mongoose.model('projectTaskStatus', projectTaskStatusSchema);

/* EXPORT */
module.exports = ProjectTaskStatus;    