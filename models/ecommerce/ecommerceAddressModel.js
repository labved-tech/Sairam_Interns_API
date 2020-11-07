/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceAddressSchema = new Schema({
  address1: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalcode: { type: Number },
  createdBy: { type: mongoose.ObjectId },
  updatedBy: { type: mongoose.ObjectId },
},
  { timestamps: true },
);


/* MODEL */
const EcommerceAddress = mongoose.model(
  'ecommerceAddress',
  ecommerceAddressSchema
);

/* EXPORT */
module.exports = EcommerceAddress;
