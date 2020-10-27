/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const farmRegionsSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _farmId:{type:mongoose.ObjectId},
    _zoneId:{type:mongoose.ObjectId},
    consultant:[]
});

/* MODEL */
const FarmRegions = mongoose.model('farmRegions', farmRegionsSchema);

/* EXPORT */
module.exports = FarmRegions;