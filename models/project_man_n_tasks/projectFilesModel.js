/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectDiscussionCommentsSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    fileName:{type:String},
    fileType:{type:String},
    subject:{type:String},
    description:{type:String},
    dateadded:{type:Date},
    _projectId:{type:mongoose.ObjectId},
    _userId:{type:mongoose.ObjectId},
    external:{type:String},
    thumbnailLink:{type:String}
});

/* MODEL */
const ProjectDiscussionComments = mongoose.model('projectDiscussionComments', projectDiscussionCommentsSchema);

/* EXPORT */
module.exports = ProjectDiscussionComments;