/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA */

const exampleSchema = {
  name: String,
  email: String,
  mobNo: String,
};

/* MODEL */
const example = mongoose.model('example', exampleSchema);

/* EXPORT */
module.exports = example;
