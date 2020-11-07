/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const leadEntriesSchema = new Schema(
  {
    name: { type: String },
    title: { type: String },
    _categoryId: { type: mongoose.ObjectId },
    company: { type: String },
    description: { type: String },
    email: { type: String },
    website: { type: String },
    address: {
      _id: { type: mongoose.ObjectId },
      address1: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },
    contactInformation: [
      {
        item: { type: String },
        type: { type: String },
        isPublic: { type: Boolean },
        createdBy: { type: mongoose.ObjectId },
        updatedBy: { type: mongoose.ObjectId },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
    assignedTo: { type: String },
    source: {
      _id: { type: mongoose.ObjectId },
      name: { type: String },
    },
    _sourceId: { type: mongoose.ObjectId },
    leadStatus: {
      _id: { type: mongoose.ObjectId },
      name: { type: String },
      statusOrder: { type: String },
      colour: { type: String },
      isDefault: { type: String },
      notes: { type: String },
    },
    lastContact: { type: Date },
    priority: { type: Number },
    dateConverted: { type: Date },
    lost: { type: Boolean },
    lastLeadStatus: { type: String },
    lastStatusChange: { type: Date },
    status: { type: String },
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
  },
  { timestamps: true }
);

/* MODEL */
const LeadEntries = mongoose.model('leadEntries', leadEntriesSchema);

/* EXPORT */
module.exports = LeadEntries;
