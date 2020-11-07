/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const announcementNotifySchema = new Schema(
  {
    _announcementId: { type: mongoose.ObjectId },
    priority: { type: Number},
    recipient: [
      {
        _id: { type: mongoose.ObjectId },
        _recipientId: { type: mongoose.ObjectId },
        recipentName: { type: String },
        recipentEmail: { type: String },
        isEmailSent: { type: Boolean },
        seenAt: { type: Date },
        sentAt: { type: Date },
        createdBy: { type: mongoose.ObjectId },
        updatedBy: { type: mongoose.ObjectId },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      }
      
    ],
    createdBy: { type: mongoose.ObjectId  },
    updatedBy: { type: mongoose.ObjectId },
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
