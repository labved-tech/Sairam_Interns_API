/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const extObjectSchema = new Schema({
  email: String,
  mobNo: Number,
  createdBy: { type: mongoose.ObjectId, required: 1 },
  updatedBy: { type: mongoose.ObjectId, required: 1 },
  createdAt: { type: Date, required: 1 },
  updatedAt: { type: Date, required: 1 },
});

/* MODEL */
const ExtObject = mongoose.model(
  'extObject', // collection name
  extObjectSchema // schema name
);

/* EXPORT */
module.exports = ExtObject;
