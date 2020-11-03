/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const formsSchema = new Schema({
  name: { type: String },
  _ownerid: { type: mongoose.ObjectId },
  aliveTill: { type: Date },
  accountInclude: [],
  accountExclude: [],
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true }
},
{ timestamps: true }
);

/* MODEL */
const Forms = mongoose.model('forms', formsSchema);

/* EXPORT */
module.exports = Forms;
