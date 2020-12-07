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
    route: {
      type: String,
      unique: [true, 'Already exists'],
    },
    priority: { type: Number },
    _subItem1: [{ type: mongoose.ObjectId, ref: 'menu-subItem1' }],
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
