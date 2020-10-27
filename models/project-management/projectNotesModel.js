/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectNotesSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _projectId:{type:mongoose.ObjectId},
    _userId:{type:mongoose.ObjectId},
    content:{type:String}
});

/* MODEL */
const ProjectNotes = mongoose.model('projectNotes', projectNotesSchema);

/* EXPORT */
module.exports = ProjectNotes;