/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taskChecklistEntriesSchema = new Schema({
  _taskId: { type: mongoose.ObjectId },
  finished: { type: Boolean },
  description: { type: String },
  dateadded: { type: Date },
  addedBy: { type: String },
  listOrder: { type: Number },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId},
},
{ timestamps: true }
);


/* MODEL */
const TaskChecklistEntries = mongoose.model(
  'taskChecklistEntries',
  taskChecklistEntriesSchema
);

/* EXPORT */
module.exports = TaskChecklistEntries;
