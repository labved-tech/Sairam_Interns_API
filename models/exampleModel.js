/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA */

const exampleSchema = {
  name: String,
  email: String,
  mobNo: String,
};

/* MODEL */
const Example = mongoose.model('example', exampleSchema);

/* EXPORT */
module.exports = Example;
