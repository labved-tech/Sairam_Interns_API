/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const pagesSchema = new Schema({
  name: { type: String },
  state: { type: Object },
  _ownerid: { type: mongoose.ObjectId },
  contents: [],
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId}
},
{ timestamps: true }
);

/* MODEL */
const Pages = mongoose.model('pages', pagesSchema);

/* EXPORT */
module.exports = Pages;
