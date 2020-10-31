/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const analyticsSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  name: { type: String },
  state: { type: Object },
  _ownerid: { type: mongoose.ObjectId },
  _reportid: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true }
},
{ timestamps: true }
);

/* MODEL */
const Analytics = mongoose.model('analytics', analyticsSchema);

/* EXPORT */
module.exports = Analytics;
