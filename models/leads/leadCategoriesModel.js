/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const leadCategoriesSchema = new Schema({
  name: { type: String },
  description: { type: String },
  notes: { type: String },
  status: { type: String },
  createdBy: { type: mongoose.ObjectId },
  updatedBy: { type: mongoose.ObjectId},
},
{ timestamps: true }
);

/* MODEL */
const LeadCategories = mongoose.model('leadCategories', leadCategoriesSchema);

/* EXPORT */
module.exports = LeadCategories;
