/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuSubItems1Schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, 'Already exists'],
    },
    _parent: { type: mongoose.ObjectId, ref: 'menu-items' },
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
const MenuSubItems1 = mongoose.model(
  'menu-subItem1', // collection name
  menuSubItems1Schema // schema name
);

/* EXPORT */
module.exports = MenuSubItems1;
