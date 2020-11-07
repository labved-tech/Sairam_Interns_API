/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const formResponseSchema = new Schema({
  _formId: { type: mongoose.ObjectId },
  response: { type: Object },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId}
},
{ timestamps: true }
);

/* MODEL */
const FormResponse = mongoose.model('formResponse', formResponseSchema);

/* EXPORT */
module.exports = FormResponse;
