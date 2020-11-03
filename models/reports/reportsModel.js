/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const reportsSchema = new Schema({
  name: { type: String },
  state: { type: Object },
  _ownerid: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true }
},
{ timestamps: true }
);
/* MODEL */
const Reports = mongoose.model('reports', reportsSchema);

/* EXPORT */
module.exports = Reports;
