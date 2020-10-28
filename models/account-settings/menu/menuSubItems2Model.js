/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuSubItems2Schema = new Schema(
  {
    name: { type: String, unique: [true, 'Already exists'] },
    _parentId: { type: mongoose.ObjectId },
    route: { type: String, unique: [true, 'Already exists'] },
    priority: { type: Number, unique: [true, 'Already exists'] },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const MenuSubItems2 = mongoose.model(
  'menuSubItems2', // collection name
  menuSubItems2Schema // schema name
);

/* EXPORT */
module.exports = MenuSubItems2;
