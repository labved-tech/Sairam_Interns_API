/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const userRolesSchema = new Schema(
  {
    name: { type: String, required: [1, 'Please provide Name'] },
    description: { type: String },
    status: { type: String },
    pageAccess: { type: boolean },
    chartAccess: { type: boolean },
    formAccess: { type: boolean },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const UserRoles = mongoose.model(
  'userRoles', // collection name
  userRolesSchema // schema name
);

/* EXPORT */
module.exports = UserRoles;
