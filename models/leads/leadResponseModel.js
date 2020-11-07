/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const leadResponseSchema = new Schema({
  _leadId: { type: mongoose.ObjectId },
  _responderId: { type: mongoose.ObjectId },
  emailSent: { type: Boolean },
  isStatusChange: { type: Boolean },
  message: { type: String },
  status: { type: String },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId},
},
{ timestamps: true }
);

/* MODEL */
const LeadResponse = mongoose.model('leadResponse', leadResponseSchema);

/* EXPORT */
module.exports = LeadResponse;
