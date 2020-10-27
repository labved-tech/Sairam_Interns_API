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
  createdAt: { type: Date },
  createdBy: { type: mongoose.ObjectId },
  updatedAt: { type: Date },
  updatedBy: { type: mongoose.ObjectId },
});

/* MODEL */
const LeadCategories = mongoose.model('leadCategories', leadCategoriesSchema);

/* EXPORT */
module.exports = LeadCategories;
