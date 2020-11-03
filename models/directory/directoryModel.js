/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const directorySchema = new Schema({
    name:{type:String},   
    single:{type:String},
    plural:{type:String},
    slug:{type:String},
    categories:[],
    createdBy: { type: mongoose.ObjectId, required: true },
      updatedBy: { type: mongoose.ObjectId, required: true },
    },
    { timestamps: true }
);

/* MODEL */
const Directory = mongoose.model('directory', directorySchema);

/* EXPORT */
module.exports = Directory;
