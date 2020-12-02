/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuManagerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, 'Already exists'],
      ref: 'menu-items',
    },
    description: { type: String },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const MenuManager = mongoose.model('menu-manager', menuManagerSchema);

/* EXPORT */
module.exports = MenuManager;
