/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuSubItems1Schema = new Schema(
  {
    name: {
      type: String,
    },
    route: {
      type: String,
    },
    priority: { type: Number },
    _subItem2: [{ type: mongoose.ObjectId, ref: 'menu-subItem2' }],
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
