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
  createdBy: { type: mongoose.ObjectId, reqired:1 },
  updatedBy: { type: mongoose.ObjectId, reqired:1},
},
{ timestamps: true }
);

/* MODEL */
const LeadCategories = mongoose.model('leadCategories', leadCategoriesSchema);

/* EXPORT */
module.exports = LeadCategories;
