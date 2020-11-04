/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const eventEntriesSchema = new Schema(
  {
    status: { type: String },
    priority: { type: String },
    expires: { type: Number },
    type: { type: String },
    meta: [],
    location: { type: Object },
    boundary: { type: Number },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const EventEntries = mongoose.model('eventEntries', eventEntriesSchema);

/* EXPORT */
module.exports = EventEntries;
