/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceProductsSchema = new Schema({
  manufacturerPartNo: { type: String },
  name: { type: String },
  description: { type: String },
  categoryId: { type: mongoose.ObjectId },
  unitPrice: { type: Number },
  MRP: { type: Number },
  images: [],
  note: { type: String },
  ranking: { type: Number },
  maxQuantityPerOrderNumber: { type: Number },
  sellerId:{ type: mongoose.ObjectId },
  _reviewAttributeId: { type: mongoose.ObjectId },
  status: { type: String },
  HSNCode: { type: String },
  createdBy: { type: mongoose.ObjectId },
  updatedBy: { type: mongoose.ObjectId },
},
  { timestamps: true }
);

/* MODEL */
const EcommerceProducts = mongoose.model(
  'ecommerceProducts',
  ecommerceProductsSchema
);

/* EXPORT */
module.exports = EcommerceProducts;
