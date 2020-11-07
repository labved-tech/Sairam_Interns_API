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
      createdBy: { type: mongoose.ObjectId},
      updatedBy: { type: mongoose.ObjectId},
      createdAt: { type: Date},
      updatedAt: { type: Date}
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
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId},
},
{ timestamps: true }
);

/* MODEL */
const FarmEntries = mongoose.model('farmEntries', farmEntriesSchema);

/* EXPORT */
module.exports = FarmEntries;
