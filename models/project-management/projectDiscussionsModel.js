/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectDiscussionsSchema = new Schema({
  _projectId: { type: mongoose.ObjectId },
  subject: { type: String },
  description: { type: String },
  datecreated: { type: Date },
  lastActivity: { type: Date },
  startedBy: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);

/* MODEL */
const ProjectsDiscussions = mongoose.model(
  'projectDiscussions',
  projectDiscussionsSchema
);

/* EXPORT */
module.exports = ProjectsDiscussions;
