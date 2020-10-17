/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */
const PersonalDetails = require('./personalDetailsModel');

/* SCHEMA */
const userInformationSchema = new Schema({
  _parentId: {
    type: mongoose.ObjectId,
  },
  status: { type: String },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, ' Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
    minlength: 8,
  },
  accountType: {
    type: String,
    required: [true, 'Please provide a valid account Type'],
  },
  personalDetails: {
    type: Schema.Types.ObjectId,
    ref: 'PersonalDetails',
  },
  isOrganisation: { type: Boolean },
  organisationDetails: {
    type: Schema.Types.ObjectId,
    ref: 'OrganisationDetails',
  },
  usergroupId: [mongoose.ObjectId],
  userGroups: [],
  surveyNo: { type: String },
  createAt: { type: Date, Default: Date.now },
  updatedAt: { type: Date },
});

/* MODEL */
const UserInformation = mongoose.model(
  'userInformation', // collection name
  userInformationSchema // schema name
);

/* EXPORT */
module.exports = UserInformation;
