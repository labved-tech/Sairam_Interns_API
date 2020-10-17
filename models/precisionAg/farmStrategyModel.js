/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const farmStrategySchema = new Schema({
    _id:{type:mongoose.ObjectId},
    name:{type:String},
    description:{type:String},
    _zoneId:{type:mongoose.ObjectId},
    _cropId:{type:mongoose.ObjectId},
    _regionId:{type:mongoose.ObjectId},
    expectedYeild:{type:Number},
    expectedYeildUnit:{type:String},
    actualYeild:{type:Number},
    actualYeildUnit:{type:String},
    start:{type:Date},
    expectedEnd:{type:Date},
    stages:[
        {
            _id:{type:mongoose.ObjectId},
            name:{type:String},
            description:{type:String},
            start:{type:Date},
            end:{type:Date},
            commodities:[
                {
                    _id:{type:mongoose.ObjectId},
                    type:{type:String},
                    name:{type:String},
                    quantity:{type:Number},
                    unitOfMeasurement:{type:String},
                    editable:{type:Boolean},
                    quotations:{type:Array},
                    proformaInvoices:{type:Array},
                    taxInvoices:{type:Array},
                    deliveryNotes:{type:Array},
                    packingLists:{type:Array},
                    ecommOrders:{type:Array}

                }
            ],
            stageOrder:{type:Number},
            editable:{type:boolean},
            createdBy:{type:mongoose.ObjectId},
            createdAt:{type:Date},
            updatedAt:{type:Date}

        }
    ],
    _contractId:{type:mongoose.ObjectId},
    exportedStrategyId:{type:String},
    rate:{type:String},
    totalExpense:{type:Number},
    createdBy:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    updatedAt:{type:Date} ,
    authorsNote:{type:String},
    _parentId:{type:mongoose.ObjectId}   

});

/* MODEL */
const FarmStrategy = mongoose.model('farmStrategy', farmStrategySchema);

/* EXPORT */
module.exports = FarmStrategy;