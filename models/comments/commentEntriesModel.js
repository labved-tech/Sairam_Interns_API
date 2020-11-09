/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const commentEntriesSchema = new Schema(
  {
    _commentorId: { type: mongoose.ObjectId },
    relName: { type: String },
    _relId: { type: mongoose.ObjectId },
    rating: { type: Number },
    message: { type: String },
    commentReplies: [
      {
        message: { type: String },
        _commentorId: { type: mongoose.ObjectId },
        createdBy: { type: mongoose.ObjectId },
        updatedBy: { type: mongoose.ObjectId },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
    status: { type: String },
    createdBy: { type: mongoose.ObjectId },
    updatedBy: { type: mongoose.ObjectId },
  },
  { timestamps: true },
);

/* MODEL */
const CommentEntries = mongoose.model('commentEntries', commentEntriesSchema);

/* EXPORT */
module.exports = CommentEntries;
