/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const extObjectSchema = new Schema({ email: String, mobNo: Number });

/* MODEL */
const ExtObject = mongoose.model(
  'extObject', // collection name
  extObjectSchema // schema name
);

/* EXPORT */
module.exports = ExtObject;
