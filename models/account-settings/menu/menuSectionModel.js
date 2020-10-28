/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuSectionSchema = new Schema(
  {
    sectionName: { type: String, unique: [true, 'Already exists'] },
    priority: { type: Number, unique: [true, 'Already exists'] },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const MenuSection = mongoose.model(
  'menuSection', // collection name
  menuSectionSchema // schema name
);

/* EXPORT */
module.exports = MenuSection;
