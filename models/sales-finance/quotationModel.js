/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const quotationSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  moduleReferance: { type: String },
  header: { type: String },
  date: { type: Date },
  _buyerId: { type: mongoose.ObjectId },
  buyerName: { type: String },
  buyerAddress: { type: Object },
  buyerEmail: { type: String },
  buyerContactNumber: { type: Number },
  buyerContactNumbertype: { type: String },
  _sellerId: { type: mongoose.ObjectId },
  sellerName: { type: String },
  sellerAttentionName: { type: String },
  sellerAddress: { type: Object },
  sellerEmail: { type: String },
  sellerContactNumber: { type: Number },
  sellerContactNumbertype: { type: String },
  subject: { type: String },
  body: { type: String },
  itemTable: [],
  termsAndConditions: { type: String },
  footer: { type: String },
  paymentMethods: {
    _id: { type: mongoose.ObjectId },
    type: { type: String },
    meta: { type: Object },
  },
  QuotationNumber: { type: Number },
});

/* MODEL */
const Quotation = mongoose.model('quotation', quotationSchema);

/* EXPORT */
module.exports = Quotation;
