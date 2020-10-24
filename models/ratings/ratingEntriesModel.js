/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ratingEntriesSchema =new Schema( {
    _id:{type:mongoose.ObjectId},
    relType:{type:String},   
    _relId:{type:mongoose.ObjectId},
    meta:
    [
        {
            _attributeId:{type:mongoose.ObjectId},
            type:{type:String},
            value:{type:String}
        }
    ],
    
    _userId:{type:mongoose.ObjectId}, 
    status:{type:String},   
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId},
    updatedBy:{type:mongoose.ObjectId}, 
    updatedAt:{type:Date}   
});

/* MODEL */
const RatingEntries = mongoose.model('ratingEntries',ratingEntriesSchema);

/* EXPORT */
module.exports = RatingEntries;    