/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const farmExportedStrategySchema = new Schema({
    _id:{type:mongoose.ObjectId},
    name:{type:String},
    description:{type:String},
    _zoneId:{type:mongoose.ObjectId},
    _cropId:{type:mongoose.ObjectId},
    _farmId:{type:mongoose.ObjectId},
    expectedYeild:{type:Number},
    expectedYeildUnit:{type:String},
    actualYeild:{type:Number},
    actualYeildUnit:{type:String},
    start:{type:Date},
    expectedEnd:{type:Date},
    stages:[],
    shareable:{type:Boolean},
    shareableType:{type:String},
    contractTemplateId:{type:String},
    rate:{type:String},
    totalExpense:{type:Number},
    author_notes:{type:String},
    parentId:{type:String}
});

/* MODEL */
const FarmExportedStrategy = mongoose.model('fofarmExportedStrategy', farmExportedStrategySchema);

/* EXPORT */
module.exports = FarmExportedStrategy;