/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const accountSubscriptionInformationSchema = new Schema(
  {
    status: { type: String, required: [1, 'Please provide status'] },
    _userId: { type: mongoose.ObjectId, required: true },
    _subscriptionPackageId: { type: mongoose.ObjectId, required: true },
    validFrom: { type: Date },
    validTo: { type: Date },
    userCount: {
      type: Number,
      required: [true, 'Please provide a valid user Count'],
    },
    dataCurrentPerMonthValue: {
      type: Number,
      required: [true, 'Please provide valid data max per month value'],
    },
    dataCurrentPerMonthUnits: {
      type: String,
      required: [true, 'Please provide valid data max per month units'],
    },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const SubscriptionPackageInformation = mongoose.model(
  'accountSubscriptionInformation', // collection name
  accountSubscriptionInformationSchema // schema name
);

/* EXPORT */
module.exports = SubscriptionPackageInformation;
