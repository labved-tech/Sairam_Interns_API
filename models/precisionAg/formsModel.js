/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const formsSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    name:{type:String},
    _ownerid:{type:mongoose.ObjectId},
    aliveTill:{type:Date},
    accountInclude:[],
    accountExclude:[]
});

/* MODEL */
const Forms = mongoose.model('forms', formsSchema);

/* EXPORT */
module.exports = Forms;