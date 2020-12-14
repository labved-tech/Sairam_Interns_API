/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const performaInvoiceSchema = new Schema({
  performaInvoiceNo: { type: String },
  moduleReferance: { type: String },
  header: { type: String },
  date: { type: Date },
  _orderId: { type: mongoose.ObjectId },
  orderDate: { type: Date },
  _buyerId: { type: mongoose.ObjectId },
  billingName: { type: String },
  billingAddress: { type: Object },
  billingEmail: { type: String },
  billingContactNumber: { type: String },
  consigneeName: { type: String },
  consigneeAddress: { type: Object },
  consigneeContactNumber: { type: String },
  _sellerId: { type: String },
  sellerName: { type: String },
  sellerAddress: { type: Object },
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
          createdBy: { type: mongoose.ObjectId },
          updatedBy: { type: mongoose.ObjectId }
        },
      ],
      createdBy: { type: mongoose.ObjectId },
      updatedBy: { type: mongoose.ObjectId }
    }
  ],
  itemTable: [
    {
      serialNo: { type: String },
      itemCode: { type: String },
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
      createdBy: { type: mongoose.ObjectId },
      updatedBy: { type: mongoose.ObjectId }
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
  performaInvoiceNumber: { type: Number },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId},
},
  { timestamps: true }
);


/* MODEL */
const PerformaInvoice = mongoose.model('performaInvoice', performaInvoiceSchema);

/* EXPORT */
module.exports = PerformaInvoice;
