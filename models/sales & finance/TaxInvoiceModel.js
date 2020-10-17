/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const taxInvoiceSchema =new Schema( {
    _id:{type:mongoose.ObjectId},
    taxInvoiceNo:{type:String},
    header:{type:String},
    date:{type:Date},
    _orderId:{type:mongoose.ObjectId},
    orderDate:{type:Date},
    _buyerId:{type:mongoose.ObjectId},
    billingName:{type:String},
    billingAddress:{type:Object},
    billingEmail:{type:String},
    contactNumber:{type:Number},
    billingGSTIN:{type:String},
    consigneeName:{type:String},
    consigneeAddress:{type:Object},
    consigneeContactNumber:{type:Number},
    _sellerId:{type:mongoose.ObjectId},
    sellerName:{type:String},
    sellerAddress:{type:Object},
    sellerContactNumber:{type:Number},
    carrierTrackingNo:{type:String},
    carrierCharges:{type:Number},
    paymentMeta:{
        
        accountNo:{type:String},
        bankName:{type:String},
        bankIFSC:{type:String}
           
    },
    itemTable:{
        [
            {
                serialNo:{type:String},
                itemCode:{type:String},
                name:{type:String},
                quantity:{type:Number},
                unitOfMeasurement:{type:String},
                unitPrice:{type:Number},
                discount:{type:Number},
                discountRate:{type:Number},
                taxableValue:{type:Number},
                CGSTRate:{type:Number},
                CGSTAmount:{type:Number},
                SGSTRate:{type:Number},
                SGSTAmount:{type:Number},
                IGSTRate:{type:Number},
                IGSTAmount:{type:Number},
                totalPrice:{type:Number}
            }
        ]
    },
    totalBeforeTax:{type:Number},
    CGSTTotal:{type:Number},
    SGSTTotal:{type:Number},
    IGSTTotal:{type:Number},
    grandTotal:{type:Number},
    termsAndConditions:{type:Object},
    footer:{type:String},
    meta:{type:Object},
    source:{type:String},
    perfomaInvoiceNumber:{type:Number}
});

/* MODEL */
const TaxInvoice = mongoose.model('taxInvoice',taxInvoiceSchema);

/* EXPORT */
module.exports = taxInvoice;    