/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const directoryLevelsSchema = new Schema({
  name: { type: String },
  description: { type: String },
  activePeriod: { type: Number },
  changeLevelId: { type: String },
  listingsInPackage: { type: Number },
  riseUpEnabled: { type: Boolean },
  sticky: { type: Boolean },
  featured: { type: Boolean },
  ownPage: { type: Boolean },
  unlimitedCategories: { type: Boolean },
  map: { type: Boolean },
  mapMakers: { type: Boolean },
  logoEnabled: { type: Boolean },
  imageLimit: { type: Number },
  updatedAt: { type: Date },
  videoLimit: { type: Number },
  contentFields: { type: Object },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);

/* MODEL */
const DirectoryLevels = mongoose.model(
  'directoryLevels',
  directoryLevelsSchema
);

/* EXPORT */
module.exports = DirectoryLevels;
