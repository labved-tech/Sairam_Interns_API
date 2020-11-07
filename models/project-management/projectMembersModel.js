/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectMembersSchema = new Schema({
  _projectId: { type: mongoose.ObjectId },
  _userId: { type: mongoose.ObjectId },
  status: { type: String },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId},
},
{ timestamps: true }
);

/* MODEL */
const ProjectMembers = mongoose.model('projectMembers', projectMembersSchema);

/* EXPORT */
module.exports = ProjectMembers;
