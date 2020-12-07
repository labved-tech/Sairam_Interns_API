/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const farmExportedStrategySchema = new Schema({
  name: { type: String },
  description: { type: String },
  _zoneId: { type: mongoose.ObjectId },
  _cropId: { type: mongoose.ObjectId },
  _farmId: { type: mongoose.ObjectId },
  expectedYield: { type: Number },
  expectedYieldUnit: { type: String },
  actualYield: { type: Number },
  actualYieldUnit: { type: String },
  start: { type: Date },
  expectedEnd: { type: Date },
  stages: [],
  shareable: { type: Boolean },
  shareableType: { type: String },
  _contractTemplateId: { type: mongoose.ObjectId },
  rate: { type: String },
  totalExpense: { type: Number },
  authorNotes: { type: String },
  _parentId: {type: mongoose.ObjectId },
  createdBy: { type: mongoose.ObjectId},
  updatedBy: { type: mongoose.ObjectId}
},
{ timestamps: true }
);
/* MODEL */
const FarmExportedStrategy = mongoose.model(
  'fofarmExportedStrategy',
  farmExportedStrategySchema
);

/* EXPORT */
module.exports = FarmExportedStrategy;
