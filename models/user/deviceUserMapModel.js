/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const deviceUserMapSchema = new Schema(
  {
    _userId: {
      type: mongoose.ObjectId,
    },
    _deviceId: [
      {
        type: mongoose.ObjectId,
      },
    ],
    admins: [],
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const DeviceUserMap = mongoose.model(
  'deviceUserMap', // collection name
  deviceUserMapSchema // schema name
);

/* EXPORT */
module.exports = DeviceUserMap;
