/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const contractTemplatesSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  billingType: { type: String },
  value: { type: Number },
  tax: {
    CGSTRate: { type: String },
    SGSTRate: { type: String },
    IGSTRate: { type: String },
    HSNCode: { type: String },
  },
  _contractOwnerId: { type: mongoose.ObjectId },
  contractFileTemplateURL: { type: String },
  isRepeat: { type: Boolean },
  repeatInterval: { type: Number },
  repeatIntervalType: { type: String },
  currentRepeatNumber: { type: Number },
  totalRepeatNumber: { type: Number },
  totalRepeatAllowed: { type: Number },
  additionalAttributesIds: [
    {
      _id: { type: mongoose.ObjectId },
      name: { type: String },
      type: { type: String },
      createdAt: { type: Date },
      createdBy: { type: mongoose.ObjectId },
      updatedAt: { type: Date },
      updatedBy: { type: mongoose.ObjectId },
    },
  ],
  terms: [
    {
      title: { type: String },
      text: { type: String },
    },
  ],
  validity: { type: Number },
  createdBy: { type: mongoose.ObjectId },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

/* MODEL */
const ContractTemplates = mongoose.model(
  'contractTemplates',
  contractTemplatesSchema
);

/* EXPORT */
module.exports = ContractTemplates;
