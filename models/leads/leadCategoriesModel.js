/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const leadCategoriesSchema = new Schema({
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
const LeadCategories = mongoose.model('leadCategories', leadCategoriesSchema);

/* EXPORT */
module.exports = LeadCategories;
