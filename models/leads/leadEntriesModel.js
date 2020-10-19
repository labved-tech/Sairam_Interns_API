/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const leadEntriesSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    name:{type:String},
    title:{type:String},
    _categoryId:{type:mongoose.ObjectId},
    company:{type:String},
    description:{type:String},
    email:{type:String},
    website:{type:String}, 
    address:{
        _id:{type:mongoose.ObjectId},
        Address1:{type:String},
        Street:{type:String},
        City:{type:String},
        State:{type:String},        
        Country:{type:String},
        PostalCode:{type:String}
    },   
    contactInformation:{
        [
            {
                _id:{type:mongoose.ObjectId},
                item:{type:String},
                type:{type:String},
                isPublic:{type:Boolean}
            }
        ]
    },
    assignedTo:{type:String},
    source:{
        _id:{type:mongoose.ObjectId},
        name:{type:String}
    },
    _sourceId:{type:mongosssose.ObjectId},
    leadStatus:{
        _id:{type:mongoose.ObjectId},
        name:{type:String},
        statusOrder:{type:String},
        colour:{type:String},
        isDefault:{type:String},
        notes:{type:String}
    },
    lastContact:{type:Date},
    priority:{type:Number},
    dateConverted:{type:Date},
    lost:{type:Boolean},
    lastLeadStatus:{type:String},
    lastStatusChange:{type:Date},  
    status:{type:String},
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId},
    updatedAt:{type:Date},
    updatedBy:{type:mongoose.ObjectId}  

});

/* MODEL */
const LeadEntries = mongoose.model('leadEntries', leadEntriesSchema);

/* EXPORT */
module.exports = LeadEntries;   