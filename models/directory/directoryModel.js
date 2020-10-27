/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const directorySchema = new Schema({
    _id:{type:mongoose.ObjectId},
    name:{type:String},   
    single:{type:String},
    plural:{type:String},
    slug:{type:String},
    categories:[]
});

/* MODEL */
const Directory = mongoose.model('directory', directorySchema);

/* EXPORT */
module.exports = Directory;
