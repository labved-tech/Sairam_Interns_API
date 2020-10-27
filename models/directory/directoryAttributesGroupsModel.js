/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const directoryAttributeGroupsSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  name: { type: String },
  attributes: [
    {
      _id: { type: mongoose.ObjectId },
      name: { type: String },
      type: { type: String },
      Description: { type: String },
      notes: { type: String },
      status: { type: String },
      updatedBy: { type: mongoose.ObjectId },
      updatedAt: { type: Date },
      createdBy: { type: mongoose.ObjectId },
      createdAt: { type: Date },
    },
  ],
  status: { type: String },
  description: { type: String },
  updatedBy: { type: mongoose.ObjectId },
  updatedAt: { type: Date },
  createdBy: { type: mongoose.ObjectId },
  createdAt: { type: Date },
});
/* MODEL */
const DirectoryAttributeGroups = mongoose.model(
  'directoryAttributeGroups',
  directoryAttributeGroupsSchema
);

/* EXPORT */
module.exports = DirectoryAttributeGroups;
