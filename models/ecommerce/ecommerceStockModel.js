/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceStockSchema = new Schema({
  _productId: { type: mongoose.ObjectId },
  type: { type: String },
  unitPrice: { type: Number },
  discount: [
    {
      _id: { type: mongoose.ObjectId },
      discountVol: { type: Number },
      discountPercent: { type: Number },
      name: { type: String },
      description: { type: String },
      createdBy: { type: mongoose.ObjectId },
      updatedBy: { type: mongoose.ObjectId },
      createdAt: { type: Date },
      updatedAt: { type: Date },
    },
  ],
  availableStock: { type: Number },
  tax: [
    {
      _id: { type: mongoose.ObjectId },
      CGST: { type: String },
      SGST: { type: String },
      IGST: { type: String },
      createdBy: { type: mongoose.ObjectId },
      updatedBy: { type: mongoose.ObjectId },
      createdAt: { type: Date },
      updatedAt: { type: Date },
    },
  ],
  name: { type: String },
  description: { type: String },
  notes: { type: String },
  _locationId: { type: mongoose.ObjectId },
  status: { type: String },
  maxQuantityPerOrderNumber: { type: Number },
  createdBy: { type: mongoose.ObjectId },
  updatedBy: { type: mongoose.ObjectId },
},
  { timestamps: true }
);



/* MODEL */
const EcommerceStock = mongoose.model('ecommerceStock', ecommerceStockSchema);

/* EXPORT */
module.exports = EcommerceStock;
