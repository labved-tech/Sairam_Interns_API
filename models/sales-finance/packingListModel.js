/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const packingListSchema = new Schema(
  {
    packingListNumber: { type: Number },
    taxInvoiceNumber: { type: Number },
    source: { type: String },
    sourceAddress: { type: Object },
    sourceEmail: { type: String },
    sourceContactNumber: { type: String },
    sourceGSTIN: { type: Number },
    consignee: { type: String },
    consigneeAddress: { type: Object },
    consigneeEmail: { type: String },
    consigneeContactNumber: { type: String },
    consigneeGSTIN: { type: String },
    box: [
      {
        boxNumber: { type: Number },
        dimensions: {
          length: { type: Number },
          breadth: { type: Number },
          width: { type: Number },
          units: { type: String }
        },

        weight: { type: Number },
        weightUnit: { type: String },
        items: [
          {
            _serialNo: { type: String },
            itemCode: { type: String },
            name: { type: String },
            quantity: { type: Number },
            unitOfMeasurement: { type: String },
            boxmeta: { type: mongoose.ObjectId },
            createdBy: { type: mongoose.ObjectId },
            updatedBy: { type: mongoose.ObjectId },
          },
        ],
      },
    ],

    shipMethod: { type: String },
    carrierName: { type: String },
    carrierTrackingNumber: { type: Number },
    shippingNotes: { type: String },
    fileProof: { type: String },
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
  },
  { timestamps: true }
);

/* MODEL */
const PackingList = mongoose.model('packingList', packingListSchema);

/* EXPORT */
module.exports = PackingList;
