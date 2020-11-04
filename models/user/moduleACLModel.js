/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const moduleACLSchema = new Schema(
  {
    name: { type: String, required: [1, 'Please provide Name'] },
    description: { type: String },
    status: { type: String },
    featureType: { type: String },
    _featureId: { type: mongoose.ObjectId },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const ModuleACL = mongoose.model(
  'moduleACL', // collection name
  moduleACLSchema // schema name
);

/* EXPORT */
module.exports = ModuleACL;
