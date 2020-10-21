/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const menuManagerSchema = new Schema({
  name: { type: String, require: true, unique: [true, 'Already exists'] },
  menuItems: [
    {
      _id: { type: mongoose.ObjectId },
      sectionName: { type: String, unique: [true, 'Already exists'] },
      priority: { type: Number, unique: [true, 'Already exists'] },
      items: [
        {
          _id: { type: mongoose.ObjectId },
          name: { type: String, unique: [true, 'Already exists'] },
          route: { type: String, unique: [true, 'Already exists'] },
          priority: { type: Number, unique: [true, 'Already exists'] },
          subItems1: [
            {
              _id: { type: mongoose.ObjectId },
              name: { type: String, unique: [true, 'Already exists'] },
              route: { type: String, unique: [true, 'Already exists'] },
              priority: { type: Number, unique: [true, 'Already exists'] },
            },
          ],
        },
      ],
    },
  ],
});

/* MODEL */
const MenuManager = mongoose.model('menuManager', menuManagerSchema);

/* EXPORT */
module.exports = MenuManager;
