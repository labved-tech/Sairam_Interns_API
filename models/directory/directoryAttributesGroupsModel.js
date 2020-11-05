/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const directoryAttributeGroupsSchema = new Schema({
  name: { type: String },
  attributes: [
    {
      _id: { type: mongoose.ObjectId },
      name: { type: String },
      type: { type: String },
      description: { type: String },
      notes: { type: String },
      status: { type: String },
      createdBy: { type: mongoose.ObjectId},
      updatedBy: { type: mongoose.ObjectId},
    },
    { timestamps: true },
  ],
  status: { type: String },
  description: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);
/* MODEL */
const DirectoryAttributeGroups = mongoose.model(
  'directoryAttributeGroups',
  directoryAttributeGroupsSchema
);

/* EXPORT */
module.exports = DirectoryAttributeGroups;


