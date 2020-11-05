/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ticketCategoriesSchema = new Schema({
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
const TicketCategories = mongoose.model(
  'ticketCategories',
  ticketCategoriesSchema
);

/* EXPORT */
module.exports = TicketCategories;
