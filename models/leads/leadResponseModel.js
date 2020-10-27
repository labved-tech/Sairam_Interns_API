/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const leadResponseSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  _leadId: { type: mongoose.ObjectId },
  _responderId: { type: mongoose.ObjectId },
  emailSent: { type: Boolean },
  isStatusChange: { type: Boolean },
  message: { type: String },
  status: { type: String },
  createdAt: { type: Date },
  createdBy: { type: mongoose.ObjectId },
  updatedAt: { type: Date },
  updatedBy: { type: mongoose.ObjectId },
});

/* MODEL */
const LeadResponse = mongoose.model('leadResponse', leadResponseSchema);

/* EXPORT */
module.exports = LeadResponse;
