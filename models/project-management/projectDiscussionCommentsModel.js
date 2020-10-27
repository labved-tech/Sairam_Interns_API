/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const projectDiscussionCommentsSchema = new Schema({
  _id: { type: mongoose.ObjectId },
  _discussionId: { type: mongoose.ObjectId },
  discussionType: { type: String },
  parent: { type: String },
  created: { type: Date },
  modified: { type: Date },
  content: { type: String },
  _commenterId: { type: mongoose.ObjectId },
  fullname: { type: String },
  fileName: { type: String },
  fileType: { type: String },
  _projectId: { type: mongoose.ObjectId },
});

/* MODEL */
const ProjectDiscussionComments = mongoose.model(
  'projectDiscussionComments',
  projectDiscussionCommentsSchema
);

/* EXPORT */
module.exports = ProjectDiscussionComments;
