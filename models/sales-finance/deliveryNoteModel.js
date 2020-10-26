/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const deliveryNoteSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    packingListnumber:{type:Number},
    taxInvoiceNumber:{type:Number},
    packingListNumber:{type:Number},
    source:{type:String},
    sourceAddress:{type:Object},
    sourceContactNumber:{type:String},
    sourceGstin:{type:String},
    consignee:{type:String},
    consigneeAddress:{type:Object},
    consigneeEmail:{type:String},
    consigneeContactNumber:{type:String},
    consigneeGstin:{type:String},
    box:{type:Array},
    shipMethod:{type:String},
    carrierName:{type:String},
    carrierTrackingNumber:{type:Number},
    shippingNotes:{type:String},
    receivedBy:{type:String},
    fileProof:{type:String}
});

/* MODEL */
const DeliveryNote = mongoose.model('deliveryNote',deliveryNoteSchema);

/* EXPORT */
module.exports = DeliveryNote;    