/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectAdminsSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _projectId:{type:mongoose.ObjectId},
    _userId:{type:mongoose.ObjectId}
});

/* MODEL */
const ProjectAdmins = mongoose.model('projectAdmins', projectAdminsSchema);

/* EXPORT */
module.exports = ProjectAdmins;
