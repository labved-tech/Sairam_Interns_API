/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const newsletterMessagesSchema = new Schema({
  
  _newsletterId: { type: mongoose.ObjectId },
  subject: { type: String },
  message: { type: String },
  recipientEmail: { type: String },
  sent: { type: Boolean },
  visited: { type: Boolean },
  lastVisited: { type: Boolean },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{timestamps: true}
);

/* MODEL */
const NewsletterMessages = mongoose.model(
  'newsletterMessages',
  newsletterMessagesSchema
);

/* EXPORT */
module.exports = NewsletterMessages;
