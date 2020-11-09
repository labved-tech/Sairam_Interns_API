/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const analyticsSchema = new Schema(
  {
    name: { type: String },
    state: { type: Object },
    _ownerid: { type: mongoose.ObjectId },
    _reportid: { type: mongoose.ObjectId },
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
  },
  { timestamps: true }
);

/* MODEL */
const Analytics = mongoose.model('analytics', analyticsSchema);

/* EXPORT */
module.exports = Analytics;
