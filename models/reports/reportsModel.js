/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const reportsSchema = new Schema({
  name: { type: String },
  state: { type: Object },
  _ownerId: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId}
},
{ timestamps: true }
);
/* MODEL */
const Reports = mongoose.model('reports', reportsSchema);

/* EXPORT */
module.exports = Reports;
