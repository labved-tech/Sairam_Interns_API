/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const eventEntriesSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  status: { type: String },
  priority: { type: String },
  expires: { type: Number },
  type: { type: String },
  meta: [],
  location: { type: Object },
  boundary: { type: Number },
  createdAt: { type: Date },
  createdBy: { type: mongoose.ObjectId },
});

/* MODEL */
const EventEntries = mongoose.model('eventEntries', eventEntriesSchema);

/* EXPORT */
module.exports = EventEntries;
