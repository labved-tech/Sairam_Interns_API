/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taskTimersSchema = new Schema({
  _taskId: { type: mongoose.ObjectId },
  startTime: { type: Date },
  endTime: { type: Date },
  timeSpend: { type: Number },
  note: { type: String },
  _userId: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);


/* MODEL */
const TaskTimers = mongoose.model('taskTimers', taskTimersSchema);

/* EXPORT */
module.exports = TaskTimers;
