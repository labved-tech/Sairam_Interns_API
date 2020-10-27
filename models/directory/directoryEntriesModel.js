/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const directoryEntriesSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  author: { type: String },
  date: { type: Date },
  image: [],
  message: { type: String },
  title: { type: String },
  slug: { type: String },
  _sellerId: { type: mongoose.ObjectId },
  status: { type: String },
  address: {
    address1: { type: String },
    message: { type: String },
    Street: { type: String },
    City: { type: String },
    State: { type: String },
    Country: { type: String },
    PostalCode: { type: String },
  },
  location: { type: Map },
  name: { type: String },
  _parentId: { type: mongoose.ObjectId },
  commentStatus: { type: String },
  commentCount: { type: Number },
  contactInfo: [
    {
      _id: { type: mongoose.ObjectId },
      item: { type: String },
      type: { type: String },
      isPublic: { type: Boolean },
    },
  ],
  relation: [
    {
      _id: { type: mongoose.ObjectId },
      type: { type: Number },
      isPublic: { type: Number },
    },
  ],
  meta: { type: Object },
  directories: [
    {
      _id: { type: mongoose.ObjectId },
      name: { type: String },
      single: { type: String },
      plural: { type: String },
      slug: { type: String },
      categories: [],
    },
  ],
  categories: [],
  level: { type: String },
  logo: { type: String },
  updatedBy: { type: mongoose.ObjectId },
  updatedAt: { type: Date },
  createdBy: { type: mongoose.ObjectId },
  createdAt: { type: Date },
});

/* MODEL */
const DirectoryEntries = mongoose.model(
  'directoryEntries',
  directoryEntriesSchema
);

/* EXPORT */
module.exports = DirectoryEntries;
