/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ratingEntriesSchema = new Schema({
  relType: { type: String },
  _relId: { type: mongoose.ObjectId },
  meta: [
    {
      _attributeId: { type: mongoose.ObjectId },
      type: { type: String },
      value: { type: String },
      createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
    
  ],

  _userId: { type: mongoose.ObjectId },
  status: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);

/* MODEL */
const RatingEntries = mongoose.model('ratingEntries', ratingEntriesSchema);

/* EXPORT */
module.exports = RatingEntries;
