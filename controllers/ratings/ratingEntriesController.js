/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const RatingEntries = require('../../models/ratings/ratingEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableRatingEntries = catchAsync(async (req, res, next) => {
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

  query = RatingEntries.find(searchObj);

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
    numRecords = await RatingEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const ratingEntries = await query;
  //ratingEntries = await Example.find();
  //console.log(ratingEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Example',
    ratingEntries,
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

exports.getAllRatingEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All RatingEntries');

  const ratingEntriess = await RatingEntries.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All RatingEntries',
    results: ratingEntriess.length,
    data: {
      ratingEntriess,
    },
  });

  next();
});

exports.getRatingEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting RatingEntries for Id ${id}`);

  const ratingEntries = await RatingEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got RatingEntries Id=${id}`,
    Data: { ratingEntries },
  });

  next();
});

exports.createRatingEntries = catchAsync(async (req, res, next) => {
  console.log('Creating RatingEntries');
  const { body } = req;

  // parse through models
  const doc = new RatingEntries(body);

  //  ratingEntries
  if (doc.meta) {
    const metaLength = doc.meta.length;
    console.log(`ratingEntries length ${metaLength}`);

    for (let i = 0; i < metaLength; i++) {
      doc.meta[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.meta[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.meta[i].createdAt = Date.now();
      doc.meta[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);

  const ratingEntries = await RatingEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created RatingEntries',
    data: { ratingEntries },
  });

  next();
});

exports.updateRatingEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating RatingEntries Id ${id}`);

  // parse through models
  const RatingEntriesToUpdate = new RatingEntries(body);
  console.log(body);
  const doc = RatingEntriesToUpdate.toObject();
  delete doc._id;

  if (RatingEntriesToUpdate.meta) {
    const metaLength = doc.meta.length;
    console.log(`Array of objects length ${metaLength}`);

    for (let i = 0; i < metaLength; i++) {
      doc.meta[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.meta[i].updatedAt = Date.now();
    }
  }

  const ratingEntries = await RatingEntries.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated RatingEntries Id=${id}`,
    data: { ratingEntries },
  });

  next();
});

exports.deleteRatingEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting RatingEntries Id ${id}`);

  const ratingEntries = await RatingEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted RatingEntries Id=${id}`,
    data: { ratingEntries },
  });

  next();
});
