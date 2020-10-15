/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA */
const userInformationSchema = {
  _parentId: { type: mongoose.ObjectId },
  status: { type: String },
  email: { type: String, required: 1 },
  accountType: { type: String, required: 1 },
  personalDetails: {
    _id: { type: mongoose.ObjectId },
    firstName: { type: String, required: 1 },
    lastName: { type: String, required: 1 },
    middleName: { type: String },
    mobileNo: { type: String, required: 1 },
    landlineNo: { type: String },
    aadharNo: { type: String },
    iecNo: { type: String },
    panNo: { type: String },
    address1: { type: String, required: 1 },
    address2: { type: String },
    city: { type: String, required: 1 },
    state: { type: String, required: 1 },
    zipCode: { type: String, required: 1 },
    country: { type: String, required: 1 },
    location: { type: String },
    verifyDocs: { type: String },
  },
  isOrganisation: { type: Boolean },
  organisationDetails: {
    _id: { type: mongoose.ObjectId },
    name: {
      type: String,
    },
    mobileNo: { type: String },
    landlineNo: { type: String },
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
  },
  usergroupId: [mongoose.ObjectId],
  userGroups: [],
  surveyNo: { type: String },
  createAt: { type: Date, Default: Date.now },
  updatedAt: { type: Date },
};

/* MODEL */
const userInformation = mongoose.model(
  'userInformation',
  userInformationSchema
);

/* EXPORT */
module.exports = userInformation;
