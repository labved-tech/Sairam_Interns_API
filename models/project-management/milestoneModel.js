/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const milestoneSchema = new Schema({
  name: { type: String },
  description: { type: String },
  descriptionVisible: { type: Boolean },
  dueDate: { type: Date },
  _projectId: { type: mongoose.ObjectId },
  color: { type: String },
  milestone_order: { type: String },
  datecreated: { type: Date },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);


/* MODEL */
const Milestone = mongoose.model('milestone', milestoneSchema);

/* EXPORT */
module.exports = Milestone;
