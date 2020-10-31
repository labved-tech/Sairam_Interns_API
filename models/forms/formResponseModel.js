/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const formResponseSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  _formId: { type: mongoose.ObjectId },
  response: { type: Object },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true }
},
{ timestamps: true }
);

/* MODEL */
const FormResponse = mongoose.model('formResponse', formResponseSchema);

/* EXPORT */
module.exports = FormResponse;
