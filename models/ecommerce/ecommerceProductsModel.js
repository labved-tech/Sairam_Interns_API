/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceProductsSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  manufacturerPartNo: { type: String },
  name: { type: String },
  description: { type: String },
  categoryId: [],
  unitPrice: { type: Number },
  MRP: { type: Number },
  images: [],
  note: { type: String },
  ranking: { type: Number },
  maxQuantityPerOrderNumber: { type: Number },
  sellerId: { type: String },
  _reviewAttributeId: { type: mongoose.ObjectId },
  status: { type: String },
  HSNCode: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
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
