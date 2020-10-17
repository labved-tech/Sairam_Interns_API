/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ratingAttributeGroupsSchema =new Schema( {
    _id:{type:mongoose.ObjectId},
    Name:{type:String}, 
    _attributId:{type:mongoose.ObjectId},
    status:{type:String}, 
    Description:{type:String},
    updatedAt:{type:Date}, 
    updatedBy:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId}    
});

/* MODEL */
const RatingAttributeGroups = mongoose.model('ratingAttributeGroups',ratingAttributeGroupsSchema);

/* EXPORT */
module.exports = RatingAttributeGroups;    