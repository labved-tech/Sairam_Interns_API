/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceStockSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _productId:{type:mongoose.ObjectId},
    type:{type:String},
    unitPrice:{type:Number},
    discount:{
        [
            {
                _id:{type:mongoose.ObjectId},
                createdBy:{type:String},
                discountVol:{type:Number},
                discountPercent:{type:Number},
                Name:{type:String},
                Description:{type:String},
            }
        ]
    },
    availableStock:{type:Number},
    tax:{
        [
            {
                _id:{type:mongoose.ObjectId},
                CGST:{type:String},  
                SGST:{type:String},    
                IGST:{type:String}
            }
        ]
    },
    Name:{type:String},
    Description:{type:String},
    Notes:{type:String},
    _locationId:{type:mongoose.ObjectId},
    status:{type:String},
    updatedAt:{type:Date},
    updatedBy:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId},
    maxQuantityPerOrderNumber:{type:Number}
});

/* MODEL */
const EcommerceStock = mongoose.model('ecommerceStock', ecommerceStockSchema);

/* EXPORT */
module.exports = EcommerceStock;
