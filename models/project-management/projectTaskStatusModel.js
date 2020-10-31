/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectTaskStatusSchema = new Schema({
  status: { type: String },
  deadlineNotified: { type: Boolean },
  kanbanOrder: { type: Number },
  milestoneOrder: { type: Number },
  _taskId: { type: mongoose.ObjectId },
  _projectId: { type: mongoose.ObjectId },
  _userId: { type: mongoose.ObjectId },
  progress: { type: Number },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);


/* MODEL */
const ProjectTaskStatus = mongoose.model(
  'projectTaskStatus',
  projectTaskStatusSchema
);

/* EXPORT */
module.exports = ProjectTaskStatus;
