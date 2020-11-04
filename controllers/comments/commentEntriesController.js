/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const CommentEntries = require('../../models/comments/commentEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllCommentEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All CommentEntries');

  const commentEntries = await CommentEntries.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All CommentEntries',
    results: commentEntries.length,
    data: {
      commentEntries,
    },
  });

  next();
});

exports.getCommentEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting CommentEntries for Id ${id}`);

  const commentEntries = await CommentEntries.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got CommentEntries Id=${id}`,
    Data: { commentEntries },
  });

  next();
});

exports.createCommentEntries = catchAsync(async (req, res, next) => {
  console.log('Creating CommentEntries');

  //parse through models
  const doc = new CommentEntries(req.body);
  //console.log(doc);

  // validate seperately sub-documents if necessary

  // replace doc if necessary

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);
  const commentEntries = await CommentEntries.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created CommentEntries',
    data: { commentEntries },
  });

  next();
});

exports.updateCommentEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating CommentEntries Id ${id}`);

  const commentEntries = await CommentEntries.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated CommentEntries Id=${id}`,
    data: { commentEntries },
  });

  next();
});

exports.deleteCommentEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting CommentEntries Id ${id}`);

  const commentEntries = await CommentEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted commentEntries Id=${id}`,
    data: { commentEntries },
  });

  next();
});
