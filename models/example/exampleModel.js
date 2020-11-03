/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const exampleSchema = new Schema(
  {
    name: { type: String, required: [1, 'must have a name'] },
    email: String,
    mobNo: Number,
    inLineObject: { email: String, mobNo: Number },
    extRefObject: { type: Schema.Types.Mixed, ref: 'ExtObject' },
    arrayOfString: [{ name: String }],
    arrayOfObject: [{ email: String, mobNo: Number }],
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const Example = mongoose.model('example', exampleSchema);

/* EXPORT */
module.exports = Example;
