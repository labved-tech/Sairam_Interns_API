/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taskChecklistStatusSchema = new Schema({
  _taskId: { type: mongoose.ObjectId },
  finished: { type: Boolean },
  _taskChecklistId: { type: mongoose.ObjectId },
  dateadded: { type: Date },
  addedBy: { type: String },
  listOrder: { type: Number },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);


/* MODEL */
const TaskChecklistStatus = mongoose.model(
  'taskChecklistStatus',
  taskChecklistStatusSchema
);

/* EXPORT */
module.exports = TaskChecklistStatus;
