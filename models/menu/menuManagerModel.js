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
    },
    description: { type: String },
    _section: [{ type: mongoose.ObjectId, ref: 'menu-section' }],
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const MenuManager = mongoose.model('menu-manager', menuManagerSchema);

/* EXPORT */
module.exports = MenuManager;
