/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ratingAttributeGroupsSchema = new Schema(
  {
    name: { type: String },
    _attributId: { type: mongoose.ObjectId },
    status: { type: String },
    description: { type: String },
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
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
