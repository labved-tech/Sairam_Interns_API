/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA */
const menuManagerSchema = {
  name: { type: String, require: true },
  items: [
    {
      _id: { type: mongoose.ObjectId },
      _pageId: { type: mongoose.ObjectId },
      name: { type: String },
      route: { type: String },
    },
  ],
};

/* MODEL */
const MenuManager = mongoose.model('menuManager', menuManagerSchema);

/* EXPORT */
module.exports = MenuManager;
