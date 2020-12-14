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

exports.getAllTableCommentEntries = catchAsync(async (req, res, next) => {
  let query;
  // BUILD QUERY
  // 1A) Filtering
  const queryObj = { ...req.query };
  console.log('Raw :', queryObj);

  const excludedFields = [
    'pagination',
    'selectedAllRows',
    'requestIds',
    'sort',
    'fields',
  ];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 1B) Advanced Filtering
  let searchObj;
  if (queryObj.query.generalSearch) {
    const searchStr = queryObj.query.generalSearch;
    searchObj = { $text: { $search: `${searchStr}` } };
    console.log(searchObj);
  }

  let queryStr = JSON.stringify(queryObj.query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log(queryStr);
  const tempObj = JSON.parse(queryStr);
  console.log('Obj :', tempObj);

  query = CommentEntries.find(searchObj);

  // 2) Sorting
  let sortBy;
  if (req.query.sort) {
    sortBy = `{ "${req.query.sort.field}": "${req.query.sort.sort}" }`;
    query = query.sort(JSON.parse(sortBy));
  } else {
    sortBy = `-createdAt`; //{createdAt : desc}
    query = query.sort(sortBy);
  }

  // 3) Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // 4) Pagination
  const page = req.query.pagination.page * 1 || 1;
  const limit = req.query.pagination.perpage * 1 || 30;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  let numRecords;
  let pages;
  if (req.query.pagination) {
    numRecords = await CommentEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const commentEntries = await query;
  //commentEntries = await Example.find();
  //console.log(commentEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Comment Entries Table ',
    commentEntries,
    meta: {
      page: page, // current page
      pages: pages, // total pages
      perpage: limit, // per page items
      total: numRecords, // total records
      field: 'createdAt', // default field sort
      sort: 'desc', // asc or desc
      rowIds: '',
    },
  });
});

exports.getAllCommentEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All CommentEntries');

  const commentEntries = await CommentEntries.find().then();

  res.status(200).json({
    status: 'success',
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
    status: 'success',
    message: `Got CommentEntries Id=${id}`,
    Data: { commentEntries },
  });

  next();
});

exports.createCommentEntries = catchAsync(async (req, res, next) => {
  console.log('Creating CommentEntries');
  const { body } = req;

  //parse through models
  const doc = new CommentEntries(body);

  //  commentReplies
  if (doc.commentReplies) {
    const commentRepliesLength = doc.commentReplies.length;
    console.log(`commentReplies length ${commentRepliesLength}`);

    for (let i = 0; i < commentRepliesLength; i++) {
      doc.commentReplies[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.commentReplies[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.commentReplies[i].createdAt = Date.now();
      doc.commentReplies[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);

  //const example = await doc.save({ validateBeforeSave: false });

  const commentEntries = await CommentEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created CommentEntries',
    data: { commentEntries },
  });

  next();
});

exports.updateCommentEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating CommentEntries Id ${id}`);

  // parse through models
  const CommentEntriesToUpdate = new CommentEntries(body);
  console.log(body);
  const doc = CommentEntriesToUpdate.toObject();
  delete doc._id;



  if (CommentEntriesToUpdate.commentReplies) {
    const commentRepliesLength = doc.commentReplies.length;
    console.log(`Array of objects length ${commentRepliesLength}`);

    for (let i = 0; i < commentRepliesLength; i++) {
      doc.commentReplies[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.commentReplies[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const commentEntries = await CommentEntries.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
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
    status: 'success',
    message: `Deleted commentEntries Id=${id}`,
    data: { commentEntries },
  });

  next();
});
