/* DEPENDENCIES */
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a valid name'],
      trim: true,
      maxlength: [40, 'must be less or equal to 40 characters'],
    },
    username: {
      type: String,
      required: [true, 'Please provide a valid username'],
      trim: true,
      maxlength: [40, 'must be less or equal to 40 characters'],
    },
    dob: { type: Date, required: true },
    mobileNo: {
      type: String,
      required: [true, 'Please provide a valid mobile no'],
    },
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
      select: false,
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
    /*     accountType: {
      type: String,
      required: [true, 'Please provide a valid account Type'],
    }, */
    role: {
      type: String,
      enum: ['user', 'guide', 'lead-guide', 'admin'],
      default: 'user',
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
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

/* MODEL */
const User = mongoose.model(
  'user', // collection name
  userSchema // schema name
);

/* EXPORT */
module.exports = User;
