/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const addressSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    Address1:{type:String},
    street:{type:String},
    City:{type:String},
    State:{type:String},
    country:{type:String},
    postalcode:{type:Number}
});

/* MODEL */
const Address = mongoose.model('address',addressSchema);

/* EXPORT */
module.exports = Address;
