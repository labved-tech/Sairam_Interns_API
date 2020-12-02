/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const addressSchema = new Schema({
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pinCode: { type: Number },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{timestamps: true}
);

/* MODEL */
const Address = mongoose.model('address', addressSchema);

/* EXPORT */
module.exports = Address;
