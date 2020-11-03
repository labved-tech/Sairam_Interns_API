/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const chartsSchema = new Schema({
  name: { type: String },
  state: { type: Object },
  _ownerId: { type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true }
},
{ timestamps: true }
);
/* MODEL */
const Charts = mongoose.model('charts', chartsSchema);

/* EXPORT */
module.exports = Charts;
