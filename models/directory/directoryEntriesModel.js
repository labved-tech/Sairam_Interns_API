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
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
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
      createdBy: { type: mongoose.ObjectId, required: true },
      updatedBy: { type: mongoose.ObjectId, required: true },
    },
    { timestamps: true }
   
  ],
  relation: [
    {
      _id: { type: mongoose.ObjectId },
      type: { type: Number },
      isPublic: { type: Number },
      createdBy: { type: mongoose.ObjectId, required: true },
      updatedBy: { type: mongoose.ObjectId, required: true },
    },
    { timestamps: true }
    
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
      createdBy: { type: mongoose.ObjectId, required: true },
      updatedBy: { type: mongoose.ObjectId, required: true },  
    },{timestamps: true }
 
  ],
  categories: [],
  level: { type: String },
  logo: { type: String },
  createdBy: { type: mongoose.ObjectId, required: true },
  updatedBy: { type: mongoose.ObjectId, required: true },
},
{ timestamps: true }
);
/* MODEL */
const DirectoryEntries = mongoose.model(
  'directoryEntries',
  directoryEntriesSchema
);

/* EXPORT */
module.exports = DirectoryEntries;
