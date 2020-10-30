/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ratingAttributeSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  name: { type: String },
  type: { type: String },
  description: { type: String },
  notes: { type: String },
  status: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);

/* MODEL */
const RatingAttribute = mongoose.model(
  'ratingAttribute',
  ratingAttributeSchema
);

/* EXPORT */
module.exports = RatingAttribute;
