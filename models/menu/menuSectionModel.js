/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuSectionSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: { type: String },
    priority: { type: Number },
    _item: [{ type: mongoose.ObjectId, ref: 'menu-items' }],
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const MenuSection = mongoose.model(
  'menu-section', // collection name
  menuSectionSchema // schema name
);

/* EXPORT */
module.exports = MenuSection;
