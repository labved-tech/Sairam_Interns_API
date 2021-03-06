/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectNotesSchema = new Schema({
  _projectId: { type: mongoose.ObjectId },
  _userId: { type: mongoose.ObjectId },
  content: { type: String },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId},
},
{ timestamps: true }
);


/* MODEL */
const ProjectNotes = mongoose.model('projectNotes', projectNotesSchema);

/* EXPORT */
module.exports = ProjectNotes;
