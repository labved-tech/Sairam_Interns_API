/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectAdminsSchema = new Schema({
  _projectId: { type: mongoose.ObjectId },
  _userId: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);


/* MODEL */
const ProjectAdmins = mongoose.model('projectAdmins', projectAdminsSchema);

/* EXPORT */
module.exports = ProjectAdmins;
