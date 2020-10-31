/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const announcementNotifySchema = new Schema(
  {
    _announcementId: { type: mongoose.ObjectId },
    priority: { type: String },
    recipient: [
      {
        _id: { type: mongoose.ObjectId },
        _recipientId: { type: mongoose.ObjectId },
        recipentName: { type: String },
        recipentEmail: { type: String },
        isEmailSent: { type: Boolean },
        seenAt: { type: Date },
        sentAt: { type: Date },
      },
    ],
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const AnnouncementNotify = mongoose.model(
  'announcementNotify',
  announcementNotifySchema
);

/* EXPORT */
module.exports = AnnouncementNotify;
