/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuSubItems2Schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, 'Already exists'],
    },
    route: {
      type: String,
      unique: [true, 'Already exists'],
    },
    priority: { type: Number },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const MenuSubItems2 = mongoose.model(
  'menu-subItem2', // collection name
  menuSubItems2Schema // schema name
);

/* EXPORT */
module.exports = MenuSubItems2;
