/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const directoryCategoriesSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  name: { type: String },
  slug: { type: String },
  _attributeGroupsId: { type: mongoose.ObjectId },
  _ratingAttributeGroupId: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);
/* MODEL */
const DirectoryCategories = mongoose.model(
  'directoryCategories',
  directoryCategoriesSchema
);

/* EXPORT */
module.exports = DirectoryCategories;
