/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceOrderSchema = new Schema(
  {
    items: [
      {
        _id: { type: mongoose.ObjectId },
        productName: { type: String },
        productId:  { type: mongoose.ObjectId },
        _manufacturerPartId: { type: mongoose.ObjectId },
        HSNCode: { type: String },
        quanity: { type: Number },
        unitPrice: { type: Number },
        meta: { type: mongoose.ObjectId },
        discount: { type: Number },
        tax: {
          _id: { type: mongoose.ObjectId },
          CGST: { type: String },
          SGST: { type: String },
          IGST: { type: String },
          calcCGST: { type: Number },
          calSGST: { type: Number },
          calcIGST: { type: Number },
        },
        createdBy: { type: mongoose.ObjectId },
        updatedBy: { type: mongoose.ObjectId },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
    numItems: { type: Number },
    grossTotal: { type: Number },
    taxTotal: { type: Number },
    shippingCharges: { type: Number },
    insuranceCharges: { type: Number },
    netTotal: { type: Number },
    status: { type: String },
    _userId: { type: mongoose.ObjectId },
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
  },
  { timestamps: true }
);

/* MODEL */
const EcommerceOrder = mongoose.model('ecommerceOrder', ecommerceOrderSchema);

/* EXPORT */
module.exports = EcommerceOrder;
