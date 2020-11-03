/* DEPENDENCIES */
const mongoose = require('mongoose');
const validator = require('validator');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* CHILD SCHEMA */

/* SCHEMA */
const userGroupSchema = new Schema(
  {
    name: { type: String, required: [1, 'Please provide Name'] },
    description: { type: String },
    status: { type: String },
    groupType: { type: String },
    _roleId: { type: mongoose.ObjectId, required: true },
    _moduleAclId: { type: mongoose.ObjectId, required: true },
    _dbFieldAclId: { type: mongoose.ObjectId, required: true },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const UserGroup = mongoose.model(
  'userGroup', // collection name
  userGroupSchema // schema name
);

/* EXPORT */
module.exports = UserGroup;
