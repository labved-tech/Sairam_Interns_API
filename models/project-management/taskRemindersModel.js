/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taskRemindersSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  description: { type: String },
  date: { type: Date },
  isNotified: { type: Boolean },
  _taskId: { type: mongoose.ObjectId },
  notifyByEmail: { type: Boolean },
  creator: { type: String },
});

/* MODEL */
const TaskReminders = mongoose.model('taskReminders', taskRemindersSchema);

/* EXPORT */
module.exports = TaskReminders;
