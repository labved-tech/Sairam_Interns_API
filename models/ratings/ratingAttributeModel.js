/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ratingAttributeSchema =new Schema( {
    _id:{type:mongoose.ObjectId},
    Name:{type:String}, 
    type:{type:String},
    Description:{type:String}, 
    Notes:{type:String},
    status:{type:String},    
    updatedAt:{type:Date}, 
    updatedBy:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId}    
});

/* MODEL */
const RatingAttribute = mongoose.model('ratingAttribute',ratingAttributeSchema);

/* EXPORT */
module.exports = RatingAttribute;    