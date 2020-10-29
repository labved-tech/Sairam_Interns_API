/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ratingAttributeGroupsSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  name: { type: String },
  _attributId: { type: mongoose.ObjectId },
  status: { type: String },
  description: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);

/* MODEL */
const RatingAttributeGroups = mongoose.model(
  'ratingAttributeGroups',
  ratingAttributeGroupsSchema
);

/* EXPORT */
module.exports = RatingAttributeGroups;
