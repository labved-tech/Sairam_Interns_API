/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceLocationsSchema = new Schema({
  address: { type: Object },
  gpsCoordinates: { type: Object },
  landlineNumber: { type: String },
  mobileNumber: { type: String },
  additionalContactInfo: {
    _id: { type: mongoose.ObjectId },
    name: { type: String },
    info: { type: String },
  },
  GSTNo: { type: String },
  PANNo: { type: String },
  licenseNo: { type: String },
  status: { type: String },
  verifyDocuments: [
    {
      _id: { type: mongoose.ObjectId },
      name: { type: String },
      URL: { type: String },
      type: { type: String },
      createdBy: { type: mongoose.ObjectId },
      updatedBy: { type: mongoose.ObjectId },
      createdAt: { type: Date },
      updatedAt: { type: Date },
    },
  ],
  name: { type: String },
  description: { type: String },
  notes: { type: String },
  _reviewAttributeId: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId },
  updatedBy: { type: mongoose.ObjectId },
},
  { timestamps: true }
);

/* MODEL */
const EcommerceLocations = mongoose.model(
  'ecommerceLocations',
  ecommerceLocationsSchema
);

/* EXPORT */
module.exports = EcommerceLocations;
