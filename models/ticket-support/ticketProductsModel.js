/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ticketProductsSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  name: { type: String },
  description: { type: String },
  notes: { type: String },
  status: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);
/* MODEL */
const TicketProducts = mongoose.model('ticketProducts', ticketProductsSchema);

/* EXPORT */
module.exports = TicketProducts;
