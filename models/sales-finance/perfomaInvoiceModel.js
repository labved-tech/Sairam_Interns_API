/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const perfomaInvoiceSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  profomaInvoiceNo: { type: String },
  moduleReferance: { type: String },
  header: { type: String },
  Date: { type: Date },
  _orderId: { type: mongoose.ObjectId },
  orderDate: { type: Date },
  _buyerId: { type: mongoose.ObjectId },
  billingName: { type: String },
  billingAddress: { type: mongoose.ObjectId },
  billingEmail: { type: String },
  billingContactNumber: { type: String },
  consigneeName: { type: String },
  consigneeAddress: { type: mongoose.objectId },
  consigneeContactNumber: { type: String },
  _sellerId: { type: String },
  sellerName: { type: String },
  sellerAddress: { type: mongoose.ObjectId },
  sellerContactNumber: { type: String },
  sellerBankDetails: {
    accountNo: { type: String },
    bankName: { type: String },
    bankIFSC: { type: String },
  },
  sellerGSTIN: { type: String },
  paymentMethods: [
    {
      _id: { type: mongoose.ObjectId },
      type: { type: String },
      meta: [
        {
          accountNo: { type: String },
          bankName: { type: String },
          bankIFSC: { type: String },
        },
      ],
    },
  ],
  itemTable: [
    {
      serialNo: { type: String },
      itemCode: { tyoe: String },
      name: { type: String },
      quantity: { type: Number },
      unitofMeasurement: { type: String },
      unitPrice: { type: Number },
      dicount: { type: Number },
      discountRate: { type: Number },
      taxableValue: { type: Number },
      CGSTRate: { type: Number },
      CGSTAmount: { type: Number },
      SGSTRate: { type: Number },
      SGSTAmount: { type: Number },
      IGSTRate: { type: Number },
      IGSTAmount: { type: Number },
      totalPrice: { type: Number },
    },
  ],
  totalBeforeTax: { type: Number },
  CGSTTotal: { type: Number },
  SGSTTotal: { type: Number },
  IGSTTotal: { type: Number },
  grandTotal: { type: Number },
  termsAndConditions: { type: Object },
  footer: { type: String },
  meta: { type: Object },
  source: { type: String },
  perfomaInvoiceNumber: { type: Number },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{timestamps: true}
);


/* MODEL */
const PerfomaInvoice = mongoose.model('perfomaInvoice', perfomaInvoiceSchema);

/* EXPORT */
module.exports = PerfomaInvoice;
