/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const userInformationSchema = new Schema(
  {
    _parentId: {
      type: mongoose.ObjectId,
    },
    status: { type: String },
    email: {
      type: String,
      required: [true, 'Please provide a valid email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, ' Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a valid password'],
      minlength: 8,
      trim: true,
    },
    accountType: {
      type: String,
      required: [true, 'Please provide a valid account Type'],
    },
    personalDetails: {
      type: Schema.Types.Mixed,
      ref: 'PersonalDetails',
    },
    isOrganisation: { type: Boolean },
    organisationDetails: {
      type: Schema.Types.Mixed,
      ref: 'OrganisationDetails',
    },
    usergroupId: [mongoose.ObjectId],
    userGroups: [],
    surveyNo: { type: String },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const UserInformation = mongoose.model(
  'userInformation', // collection name
  userInformationSchema // schema name
);

/* EXPORT */
module.exports = UserInformation;
