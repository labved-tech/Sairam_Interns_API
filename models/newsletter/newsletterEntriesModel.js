/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const newsletterEntriesSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  fromEmail: { type: String },
  description: { type: String },
  newsletterType: { type: String },
  list: [
    {
      _id: { type: mongoose.ObjectId },
      Name: { type: String },
      description: { type: String },
      emails: [],
      notes: { type: String },
      status: { type: String },
      createdAt: { type: Date },
      updatedAt: { type: Date },
      createdBy: { type: mongoose.ObjectId },
      updatedBy: { type: mongoose.ObjectId },
    },
  ],
  createdAt: { type: Date },
  updatedAt: { type: Date },
  createdBy: { type: mongoose.ObjectId },
  updatedBy: { type: mongoose.ObjectId },
});

/* MODEL */
const NewsletterEntries = mongoose.model(
  'newsletterEntries',
  newsletterEntriesSchema
);

/* EXPORT */
module.exports = NewsletterEntries;
