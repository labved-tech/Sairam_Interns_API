/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taskEntriesSchema = new Schema({
  _id: { type: mongoose.objectId },
  _projectId: { type: mongoose.ObjectId },
  name: { type: String },
  taskType: { type: String },
  description: { type: String },
  status: { type: String },
  dateFinished: { type: Date },
  isRepeat: { type: Boolean },
  repeatFromDate: { type: Date },
  repeatLastDate: { type: Date },
  repeatInterval: { type: Number },
  repeatIntervalType: { type: String },
  currentRepeatNumber: { type: Number },
  totalRepeatAllowed: { type: Number },
  deadlineNotified: { type: Boolean },
  milestone: { type: String },
  milestoneOrder: { type: Number },
  kanbanOrder: { type: Number },
  taskFormURL: { type: String },
  startDate: { type: Date },
  dateadded: { type: Date },
  dueDate: { type: Date },
  assignedTo: { type: Array },
});

/* MODEL */
const TaskEntries = mongoose.model('taskEntries', taskEntriesSchema);

/* EXPORT */
module.exports = TaskEntries;
