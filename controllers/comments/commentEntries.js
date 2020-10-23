/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const CommentEntries = require('./../../models/comments/commentEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllCommentEntries = async (req, res, next) => {
  console.log('Getting All CommentEntries');

  try {
    const commentEntriess = await CommentEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All CommentEntries',
      results: commentEntriess.length,
      data: {
        commentEntriess,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.getCommentEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting CommentEntries for Id ${id}`);

  try {
    const commentEntries = await CommentEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got CommentEntries Id=${id}`,
      Data: { commentEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createcommentEntries = async (req, res, next) => {
  console.log('Creating CommentEntries');

  try {
    const commentEntries = await CommentEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created CommentEntries',
      data: { commentEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateCommentEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating CommentEntries Id ${id}`);

  try {
    const commentEntries = await CommentEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated CommentEntries Id=${id}`,
      data: { commentEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteCommentEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting CommentEntries Id ${id}`);

  try {
    const commentEntries = await CommentEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted commentEntries Id=${id}`,
      data: { commentEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
