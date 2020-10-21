/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const addressSchema = new Schema({
    address1: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pinCode: {type:Number}
});

/* MODEL */
const Address = mongoose.model('address',addressSchema);

/* EXPORT */
module.exports = Address;    