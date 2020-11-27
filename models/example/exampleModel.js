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
    arrayOfString: [String],
    arrayOfObject: [
      {
        email: String,
        mobNo: Number,
        createdBy: { type: mongoose.ObjectId },
        updatedBy: { type: mongoose.ObjectId },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
  },
  { timestamps: true, select: false }
);

/* SEARCH */
exampleSchema.index({
  name: 'text',
  email: 'text',
  createdBy: 'text',
});

/* MODEL */
const Example = mongoose.model('example', exampleSchema);

/* EXPORT */
module.exports = Example;
