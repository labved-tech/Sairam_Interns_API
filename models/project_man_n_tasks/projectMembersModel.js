/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectMembersSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _projectId:{type:mongoose.ObjectId},
    _userId:{type:mongoose.ObjectId},
    status:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:mongoose.ObjectId},
    updatedBy:{type:mongoose.ObjectId}
    
});

/* MODEL */
const ProjectMembers = mongoose.model('projectMembers', projectMembersSchema);

/* EXPORT */
module.exports = ProjectMembers;