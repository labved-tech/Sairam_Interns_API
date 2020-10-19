/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const chartsSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    name:{type:String},
    state:{type:Object},
    _ownerId:{type:mongoose.ObjectId}
});

/* MODEL */
const Charts = mongoose.model('charts', chartsSchema);

/* EXPORT */
module.exports = Charts;