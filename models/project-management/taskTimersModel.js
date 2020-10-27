/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taskTimersSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  _taskId: { type: mongoose.ObjectId },
  startTime: { type: Date },
  endTime: { type: Date },
  timeSpend: { type: Number },
  note: { type: String },
  _userId: { type: mongoose.ObjectId },
});

/* MODEL */
const TaskTimers = mongoose.model('taskTimers', taskTimersSchema);

/* EXPORT */
module.exports = TaskTimers;
