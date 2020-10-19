/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectDiscussionsSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _projectId:{type:mongoose.ObjectId},
    subject:{type:String},
    description:{type:String},
    datecreated:{type:Date},
    lastActivity:{type:Date},
    startedBy:{type:String}
});

/* MODEL */
const ProjectDiscussion = mongoose.model('projectDiscussion', projectDiscussionSchema);

/* EXPORT */
module.exports = ProjectDiscussion;