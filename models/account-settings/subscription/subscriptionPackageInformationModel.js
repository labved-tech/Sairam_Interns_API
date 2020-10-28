/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const subscriptionPackageInformationSchema = new Schema(
  {
    status: { type: String, required: [1, 'Please provide status'] },
    isPublic: { type: Boolean, required: true },
    type: {
      type: String,
      required: [1, 'Please provide a valid subscription type'],
    },
    maxUserCount: {
      type: Number,
      required: [true, 'Please provide a valid user Count'],
    },
    maxSubletUserCount: {
      type: Number,
      required: [true, 'Please provide a valid user Count'],
    },
    durationLimitValue: {
      type: Number,
      required: [true, 'Please provide valid time value'],
    },
    durationLimitUnits: {
      type: String,
      required: [true, 'Please provide valid time unit'],
    },
    dataMaxPerMonthLimitValue: {
      type: Number,
      required: [true, 'Please provide valid data max per month value'],
    },
    dataMaxPerMonthLimitUnits: {
      type: String,
      required: [true, 'Please provide valid data max per month units'],
    },
    rate: {
      type: Number,
      required: [1, 'Please provide rate for subscription'],
    },
    pagesModule: {
      type: Schema.Types.Mixed,
      ref: 'PagesModule',
    },
    chartsModule: {
      type: Schema.Types.Mixed,
      ref: 'ChartsModule',
    },
    formsModule: {
      type: Schema.Types.Mixed,
      ref: 'FormsModule',
    },
    reportsModule: {
      type: Schema.Types.Mixed,
      ref: 'ReportsModule',
    },
    analyticsModule: {
      type: Schema.Types.Mixed,
      ref: 'AnalyticsModule',
    },
    farmsModule: {
      type: Schema.Types.Mixed,
      ref: 'FarmsModule',
    },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const SubscriptionPackageInformation = mongoose.model(
  'subscriptionPackageInformation', // collection name
  subscriptionPackageInformationSchema // schema name
);

/* EXPORT */
module.exports = SubscriptionPackageInformation;
