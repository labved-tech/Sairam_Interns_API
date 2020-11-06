/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const farmEntriesSchema = new Schema({
  _ownerId: { type: mongoose.ObjectId },
  admins: [
    {
      _adminId: { type: mongoose.ObjectId },
      permissions: { type: String },
      createdBy: { type: mongoose.ObjectId, required: true },
      updatedBy: { type: mongoose.ObjectId, required: true },
      createdAt: { type: Date, required: true },
      updatedAt: { type: Date, required: true }
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
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);

/* MODEL */
const FarmEntries = mongoose.model('farmEntries', farmEntriesSchema);

/* EXPORT */
module.exports = FarmEntries;
