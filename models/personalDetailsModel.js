/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const personalDetailsSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  firstName: {
    type: String,
    required: [true, 'Please provide a valid name'],
    trim: true,
    maxlength: [40, 'must be less or equal to 40 characters'],
  },
  lastName: { type: String },
  middleName: { type: String },
  mobileNo: {
    type: String,
    required: [true, 'Please provide a valid mobile no'],
  },
  landlineNo: { type: String },
  aadharNo: { type: String },
  iecNo: { type: String },
  panNo: { type: String },
  address1: {
    type: String,
    required: [true, 'Please provide a valid address'],
  },
  address2: { type: String },
  city: {
    type: String,
    required: [true, 'Please provide a valid city'],
  },
  state: {
    type: String,
    required: [true, 'Please provide a valid state'],
  },
  zipCode: {
    type: String,
    required: [true, 'Please provide a valid zip code'],
  },
  country: {
    type: String,
    required: [true, 'Please provide a valid country'],
  },
  location: { type: String },
  verifyDocs: { type: String },
});

/* MODEL */
const PersonalDetails = mongoose.model(
  'personalDetails', // collection name
  personalDetailsSchema // schema name
);

/* EXPORT */
module.exports = PersonalDetails;
