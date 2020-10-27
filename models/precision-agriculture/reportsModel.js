/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const reportsSchema = new Schema({

    _id:{type:mongoose.ObjectId},
    name:{type:String},
    state:{type:Object},
    _ownerid:{type:mongoose.ObjectId},    
});

/* MODEL */
const Reports = mongoose.model('reports', reportsSchema);

/* EXPORT */
module.exports = Reports;