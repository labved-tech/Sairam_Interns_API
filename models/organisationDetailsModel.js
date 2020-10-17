/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const organisationDetailsSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  name: {
    type: String,
  },
  mobileNo: { type: Number },
  landlineNo: { type: Number },
  aadharNo: { type: String },
  iecNo: { type: String },
  panNo: { type: String },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  country: { type: String },
  location: { type: String },
  verifyDocs: { type: String },
});

/* MODEL */
const OrganisationDetails = mongoose.model(
  'organisationDetails', // collection name
  organisationDetailsSchema // schema name
);

/* EXPORT */
module.exports = OrganisationDetails;
