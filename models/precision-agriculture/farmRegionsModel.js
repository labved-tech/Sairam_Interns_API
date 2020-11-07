/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const farmRegionsSchema = new Schema({
  _farmId: { type: mongoose.ObjectId },
  _zoneId: { type: mongoose.ObjectId },
  consultant: [],
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId}
},
{ timestamps: true }
);

/* MODEL */
const FarmRegions = mongoose.model('farmRegions', farmRegionsSchema);

/* EXPORT */
module.exports = FarmRegions;
