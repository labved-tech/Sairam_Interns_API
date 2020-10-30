/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
      required: [1, 'Please provide a valid password'],
      minlength: 8,
      trim: true,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please provide a valid password'],
      validate: {
        // this only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password are not the same!',
      },
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

userInformationSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

/* MODEL */
const UserInformation = mongoose.model(
  'userInformation', // collection name
  userInformationSchema // schema name
);

/* EXPORT */
module.exports = UserInformation;
