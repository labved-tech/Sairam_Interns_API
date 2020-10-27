/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const farmEntriesSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  _ownerId: { type: mongoose.ObjectId },
  admins: [
    {
      _adminId: { type: mongoose.ObjectId },
      permissions: { type: String },
    },
  ],
  name: { type: String },
  description: { type: String },
  notes: { type: String },
  status: { type: String },
  address: { type: Object },
  gpsCoordinates: { type: Map },
  size: {
    size: { type: Number },
    units: { type: String },
  },
  documents: [],
  createdBy: { type: mongoose.ObjectId },
  createdAt: { type: Date },
  updatedBy: { type: mongoose.ObjectId },
  updatedAt: { type: Date },
});

/* MODEL */
const FarmEntries = mongoose.model('farmEntries', farmEntriesSchema);

/* EXPORT */
module.exports = FarmEntries;
