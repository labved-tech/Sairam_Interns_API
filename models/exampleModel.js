/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const exampleSchema = new Schema({
  name: String,
  email: String,
  mobNo: String,
});

/* MODEL */
const Example = mongoose.model('example', exampleSchema);

/* EXPORT */
module.exports = Example;
