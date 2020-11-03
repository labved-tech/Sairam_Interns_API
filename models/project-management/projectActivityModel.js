/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectActivitySchema = new Schema({
  _projectId: { type: mongoose.ObjectId },
  _userId: { type: mongoose.ObjectId },
  fullName: { type: String },
  visibleToUser: { type: Boolean },
  descriptionKey: { type: String },
  additionalData: { type: String },
  dateadded: { type: Date },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);

/* MODEL */
const ProjectActivity = mongoose.model(
  'projectActivity',
  projectActivitySchema
);

/* EXPORT */
module.exports = ProjectActivity;
