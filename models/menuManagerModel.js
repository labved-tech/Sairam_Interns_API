/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuManagerSchema = new Schema({
  name: { type: String, require: true },
  menuItems: {
    _id: { type: mongoose.ObjectId },
    sectionName: { type: String },
    Items: [
      {
        _id: { type: mongoose.ObjectId },
        name: { type: String },
        route: { type: String },
        subItems: [
          {
            _id: { type: mongoose.ObjectId },
            name: { type: String },
            route: { type: String },
          },
        ],
      },
    ],
  },
});

/* MODEL */
const MenuManager = mongoose.model('menuManager', menuManagerSchema);

/* EXPORT */
module.exports = MenuManager;
