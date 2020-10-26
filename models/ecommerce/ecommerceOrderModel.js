/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceOrderSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    items:
        [
            {
                _id:{type:mongoose.ObjectId},
                productName:{type:String},
                productId:{type:String},
                _manufacturerPartId:{type:mongoose.ObjectId},
                HSNCode:{type:String},
                quanity:{type:Number},
                unitPrice:{type:Number},
                meta:{type:Object},
                discount:{type:Number},
                tax:{
                    _id:{type:mongoose.ObjectId},
                    CGST:{type:String},  
                    SGST:{type:String},    
                    IGST:{type:String},  
                    calcCGST:{type:Number},
                    calSGST:{type:Number},
                    calcIGST:{type:Number}
                }
            }       
                
        ],
    numItems:{type:Number},   
    grossTotal:{type:Number},   
    taxTotal:{type:Number},
    shippingCharges:{type:Number},
    insuranceCharges:{type:Number},
    netTotal:{type:Number},
    status:{type:String},
    _userId:{type:mongoose.ObjectId},
    updatedAt:{type:Date},
    updatedBy:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId}
});

/* MODEL */
const EcommerceOrder = mongoose.model('ecommerceOrder', ecommerceOrderSchema);

/* EXPORT */
module.exports = EcommerceOrder;