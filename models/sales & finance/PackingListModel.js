/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const packingListSchema =new Schema( {
    _id:{type:mongoose.ObjectId},
    packingListNumber:{type:Number},
    taxInvoiceNumber:{type:Number},
    source:{type:String},
    sourceAddress:{type:mongoose.ObjectId},
    sourceEmail:{type:String},
    sourceContactNumber:{type:String},
    sourceGSTIN:{type:Number},
    consignee:{type:String},
    consigneeAddress:{type:mongoose.ObjectId},
    consigneeEmail:{type:String},
    consigneeContactNumber:{type:String},
    consigneeGSTIN:{type:String},
    box:
        [
            {
                boxNumber:{type:Number},
                dimensions:
                    [
                        {
                            length:{tyoe:Number},
                            bredth:{type:Number},
                            width:{type:Number},
                            units:{type:Number}
                        }
                    ],
                
                weight:{type:Number},
                weightUnit:{type:String},
                items:
                [
                        {
                            _serialNo:{type:String},
                            itemCode:{type:String},
                            name:{type:String},
                            quantity:{type:Number},
                            unitOfMeasurement:{type:String},
                            boxmeta:{type:mongoose.ObjectId}
                        }
                ],
                

            }
    ],
    
    shipMethod:{type:String},
    carrierName:{type:String},
    carrierTrackingNumber:{type:Number},
    shippingNotes:{type:String},
    fileProof:{type:String}
});

/* MODEL */
const PackingList = mongoose.model('packingList',packingListSchema);

/* EXPORT */
module.exports = PackingList;    