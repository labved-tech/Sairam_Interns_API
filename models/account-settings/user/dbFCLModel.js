/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const dbFCLSchema = new Schema(
  {
    name: { type: String, required: [1, 'Please provide Name'] },
    description: { type: String },
    status: { type: String },
    collectionName: { type: String },
    fields: [{ type: String }],
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const DbFCL = mongoose.model(
  'dbFCL', // collection name
  dbFCLSchema // schema name
);

/* EXPORT */
module.exports = DbFCL;
