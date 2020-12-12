/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const FarmEntries = require('../../models/precision-agriculture/farmEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableFarmEntries = catchAsync(async (req, res, next) => {
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

  query = FarmEntries.find(searchObj);

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
    numRecords = await FarmEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const farmEntries = await query;
  //farmEntries = await FarmEntries.find();
  //console.log(farmEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All FarmEntries',
    farmEntries,
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


exports.getAllFarmEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All farmEntries');

  const farmEntries = await FarmEntries.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All farmEntries',
    results: farmEntries.length,
    data: {
      farmEntries,
    },
  });
  next();
});

exports.getFarmEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmEntries for Id ${id}`);

  const farmEntries = await FarmEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got farmEntries Id=${id}`,
    Data: { farmEntries },
  });
  next();
});

exports.createFarmEntries = catchAsync(async (req, res, next) => {
  console.log('Creating FarmEntries');
  const { body } = req;

  // parse through models
  const doc = new FarmEntries(body);

  //  adminss
  if (doc.admins) {
    const adminsLength = doc.admins.length;
    console.log(`Array of objects length ${adminsLength}`);

    for (let i = 0; i < adminsLength; i++) {
      doc.admins[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.admins[i].createdAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(`After Validation :${doc}`);

  //const farmEntries = await doc.save({ validateBeforeSave: false });

  const farmEntries = await FarmEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created farmEntries',
    data: { farmEntries },
  });

  next();
});

exports.updateFarmEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating FarmEntries Id ${id}`);

  // parse through models
  const FarmEntriesToUpdate = new FarmEntries(body);
  console.log(body);
  const doc = FarmEntriesToUpdate.toObject();
  delete doc._id;

  if (FarmEntriesToUpdate.admins) {
    const adminsLength = doc.admins.length;
    console.log(`Array of objects length ${adminsLength}`);

    for (let i = 0; i < adminsLength; i++) {
      doc.admins[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.admins[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const farmEntries = await FarmEntries.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated farmEntries Id=${id}`,
    data: { farmEntries },
  });
  next();
});

exports.deleteFarmEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmEntries Id ${id}`);

  const farmEntries = await FarmEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted farmEntries Id=${id}`,
    data: { farmEntries },
  });
  next();
});
