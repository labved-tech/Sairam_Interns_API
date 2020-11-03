/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuItemsSchema = new Schema(
  {
    name: { type: String, unique: [true, 'Already exists'] },
    _menuId: { type: mongoose.ObjectId },
    _sectionId: { type: mongoose.ObjectId },
    route: { type: String, unique: [true, 'Already exists'] },
    priority: { type: Number, unique: [true, 'Already exists'] },
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
