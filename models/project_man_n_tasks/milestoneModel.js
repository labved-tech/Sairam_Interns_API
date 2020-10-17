/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const milestoneSchema =  new Schema({
    _id:{type:mongoose.ObjectId},
    description:{type:String},
    name:{type:String},
    descriptionVisible:{type:Boolean},
    dueDate:{type:Date},
    _projectId:{type:mongoose.ObjectId},
    color:{type:String},
    milestone_order:{type:String},
    datecreated:{type:Date}
});

/* MODEL */
const Milestone = mongoose.model('milestone', milestoneSchema);

/* EXPORT */
module.exports = Milestone;    