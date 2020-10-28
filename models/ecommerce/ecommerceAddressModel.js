/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceAddressSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  address1: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalcode: { type: Number },
});

/* MODEL */
const EcommerceAddress = mongoose.model(
  'ecommerceAddress',
  ecommerceAddressSchema
);

/* EXPORT */
module.exports = EcommerceAddress;
