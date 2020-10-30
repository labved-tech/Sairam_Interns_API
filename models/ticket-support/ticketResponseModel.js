/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ticketResponseSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  _ticketId: { type: mongoose.ObjectId },
  _responderId: { type: mongoose.ObjectId },
  responderName: { type: String },
  emailSent: { type: Boolean },
  isStatusChange: { type: Boolean },
  body: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);
/* MODEL */
const TicketResponse = mongoose.model('ticketResponse', ticketResponseSchema);

/* EXPORT */
module.exports = TicketResponse;
