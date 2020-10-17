/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taskChecklistEntrySchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _taskId:{type:mongoose.ObjectId},
    finished:{type:Boolean},
    description:{type:String},
    dateadded:{type:Date},
    addedBy:{type:String},
    listOrder:{type:Number}
});

/* MODEL */
const TaskChecklistEntry = mongoose.model('taskChecklistEntry', taskChecklistEntrySchema);

/* EXPORT */
module.exports = TaskChecklistEntry;
