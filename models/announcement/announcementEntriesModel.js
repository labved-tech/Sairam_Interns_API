/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const announcementEntriesSchema = new Schema(
  {
    title: { type: String, required: 1 },
    message: { type: String },
    from: { type: String },
    isEmailReq: { type: Boolean },
    priority: { type: Number },
    targetConditions: [
      {
        condition: { type: Object },
        createdBy: { type: mongoose.ObjectId },
        updatedBy: { type: mongoose.ObjectId },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
    expires: { type: String },
    status: { type: String },
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
  },
  { timestamps: true }
);

/* MODEL */
const AnnouncementEntries = mongoose.model(
  'announcementEntries',
  announcementEntriesSchema
);

/* EXPORT */
module.exports = AnnouncementEntries;
