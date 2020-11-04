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
        _id: { type: mongoose.ObjectId },
        message: { type: String },
        _commentorId: { type: mongoose.ObjectId },
        createdBy: { type: mongoose.ObjectId },
        updatedBy: { type: mongoose.ObjectId },
      },
      { timestamps: true },
    ],
    status: { type: String },
    createdBy: { type: mongoose.ObjectId, required: true },
    updatedBy: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

/* MODEL */
const CommentEntries = mongoose.model('commentEntries', commentEntriesSchema);

/* EXPORT */
module.exports = CommentEntries;
