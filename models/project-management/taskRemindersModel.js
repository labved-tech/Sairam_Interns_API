/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taskRemindersSchema = new Schema({
  description: { type: String },
  date: { type: Date },
  isNotified: { type: Boolean },
  _taskId: { type: mongoose.ObjectId },
  notifyByEmail: { type: Boolean },
  creator: { type: String },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId},
},
{ timestamps: true }
);


/* MODEL */
const TaskReminders = mongoose.model('taskReminders', taskRemindersSchema);

/* EXPORT */
module.exports = TaskReminders;
