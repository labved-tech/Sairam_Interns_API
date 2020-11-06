/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const extObjectSchema = new Schema({
  email: String,
  mobNo: Number,
  createdBy: { type: mongoose.ObjectId },
  updatedBy: { type: mongoose.ObjectId },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

/* MODEL */
const ExtObject = mongoose.model(
  'extObject', // collection name
  extObjectSchema, // schema name
);

/* EXPORT */
module.exports = ExtObject;
