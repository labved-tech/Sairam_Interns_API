/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectEntriesSchema = new Schema({
  name: { type: String },
  description: { type: String },
  status: { type: String },
  startDate: { type: Date },
  deadline: { type: Date },
  finished: { type: Date },
  progress: { type: Number },
  estimatedHours: { type: Number },
  type: { type: String },
  _farmId: { type: mongoose.ObjectId },
  _farmRegionId: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId},
},
{ timestamps: true }
);

/* MODEL */
const ProjectEntries = mongoose.model('projectEntries', projectEntriesSchema);

/* EXPORT */
module.exports = ProjectEntries;
