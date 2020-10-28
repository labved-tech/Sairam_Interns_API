/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuManagerSchema = new Schema({
  name: { type: String, require: true, unique: [true, 'Already exists'] },
  description: { type: String },
});

/* MODEL */
const MenuManager = mongoose.model('menuManager', menuManagerSchema);

/* EXPORT */
module.exports = MenuManager;
