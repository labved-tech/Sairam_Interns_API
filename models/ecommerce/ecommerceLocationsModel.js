/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ecommerceLocationsSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    address:{type:Object},
    gpsCoordinates:{type:Object},
    landlineNumber:{type:String},
    mobileNumber:{type:String},
    additionalContactInfo:{
        
        _id:{type:mongoose.ObjectId},
        name:{type:String},
        info:{type:String},
    
    },
    GSTNo:{type:String},
    PANNo:{type:String},
    licenseNo:{type:String},
    status:{type:String},
    verifyDocuments:[
            {
                _id:{type:mongoose.ObjectId},
                name:{type:String},
                URL:{type:String},
                type:{type:String}
            }
        ],
    Name:{type:String},
    description:{type:String},
    notes:{type:String},
    _reviewAttributeId:{type:mongoose.ObjectId},
    updatedAt:{type:Date},
    updatedBy:{type:mongoose.ObjectId},    
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId}
});

/* MODEL */
const EcommerceLocations = mongoose.model('ecommerceLocations', ecommerceLocationsSchema);

/* EXPORT */
module.exports = EcommerceLocations;
