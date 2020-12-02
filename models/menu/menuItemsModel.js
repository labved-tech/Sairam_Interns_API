/* DEPENDENCIES */
const mongoose = require('mongoose');

/* CHILD SCHEMA */
const MenuSection = require('./menuSectionModel');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuItemsSchema = new Schema(
  {
    name: { type: String, unique: [true, 'Already exists'] },
    _menuId: { type: mongoose.ObjectId, ref: 'menu-manager' },
    _sectionId: { type: mongoose.ObjectId, ref: 'menu-section' },
    route: { type: String, unique: [true, 'Already exists'] },
    priority: { type: Number },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const MenuItems = mongoose.model(
  'menu-items', // collection name
  menuItemsSchema // schema name
);

/* EXPORT */
module.exports = MenuItems;
