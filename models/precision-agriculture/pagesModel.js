/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const pagesSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    name:{type:String},
    state:{type:Object},
    _ownerid:{type:mongoose.ObjectId},
    contents:[]    
});

/* MODEL */
const Pages = mongoose.model('pages', pagesSchema);

/* EXPORT */
module.exports = Pages;