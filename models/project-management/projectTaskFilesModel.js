/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectTaskFilesSchema = new Schema({
  fileName: { type: String },
  fileType: { type: String },
  dateadded: { type: Date },
  _projectId: { type: mongoose.ObjectId },
  _taskId: { type: mongoose.ObjectId },
  _userId: { type: mongoose.ObjectId },
  external: { type: String },
  thumbnailLink: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);


/* MODEL */
const ProjectTaskFiles = mongoose.model(
  'projectTaskFiles',
  projectTaskFilesSchema
);

/* EXPORT */
module.exports = ProjectTaskFiles;
