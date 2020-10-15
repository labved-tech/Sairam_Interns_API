/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA */
const menuManagerSchema = {
  _parentId: { type: mongoose.ObjectId },
  _pageId: { type: mongoose.ObjectId },
  name: { type: String, require: true },
  slug: { type: String },
  route: { type: String },
};

/* MODEL */
const menuManager = mongoose.model('menuManager', menuManagerSchema);

/* EXPORT */
module.exports = menuManager;
