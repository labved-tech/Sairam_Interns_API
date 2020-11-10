/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const contractTemplatesSchema = new Schema({
  billingType: { type: String },
  value: { type: Number },
  tax: {
    CGSTRate: { type: Number },
    SGSTRate: { type: Number },
    IGSTRate: { type: Number },
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
      createdBy: { type: mongoose.ObjectId },
        updatedBy: { type: mongoose.ObjectId },
        createdAt: { type: Date },
        updatedAt: { type: Date },
    }
  ],
  terms: [
    {
      title: { type: String },
      text: { type: String },
      createdBy: { type: mongoose.ObjectId },
      updatedBy: { type: mongoose.ObjectId },
      createdAt: { type: Date },
      updatedAt: { type: Date }
    },
  ],
  validity: { type: Number },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
  { timestamps: true }
);

/* MODEL */
const ContractTemplates = mongoose.model(
  'contractTemplates',
  contractTemplatesSchema
);

/* EXPORT */
module.exports = ContractTemplates;
