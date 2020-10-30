/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const announcementEntriesSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  title: { type: String },
  message: { type: String },
  from: { type: String },
  isEmailReq: { type: Boolean },
  priority: { type: Number },
  targetConditions: [
    {
      _id: { type: mongoose.ObjectId },
      condition: { type: Object },
    },
  ],
  expires: { type: Number },
  status: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{timestamps: true}
);

  

/* MODEL */
const AnnouncementEntries = mongoose.model(
  'announcementEntries',
  announcementEntriesSchema
);

/* EXPORT */
module.exports = AnnouncementEntries;
