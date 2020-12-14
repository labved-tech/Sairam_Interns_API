/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const PackingList = require('../../models/sales-finance/packingListModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTablePackingList = catchAsync(async (req, res, next) => {
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

  query = PackingList.find(searchObj);

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
    numRecords = await PackingList.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const packingList = await query;
  //packingList = await PackingList.find();
  //console.log(packingList);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Packing List',
    packingList,
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


exports.getAllPackingList = catchAsync(async (req, res, next) => {
  console.log('Getting All Packing List');
  const packingLists = await PackingList.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Packing List',
    results: packingLists.length,
    data: {
      packingLists,
    },
  });

  next();
});

exports.getPackingList = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Packing List for Id ${id}`);
  const packingList = await PackingList.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Packing List Id=${id}`,
    Data: { packingList },
  });

  next();
});

exports.createPackingList = catchAsync(async (req, res, next) => {
  console.log('Creating PackingList');
  const { body } = req;

  // parse through models
  const doc = new PackingList(body);
  console.log(body);

  // box
  if (doc.box) {
    const boxLength = doc.box.length;
    console.log(`Array of objects length ${boxLength}`);

    for (let i = 0; i < boxLength; i++) {
      doc.box[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.box[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.box[i].createdAt = Date.now();
      doc.box[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);
  const packingList = await PackingList.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created PackingList',
    packingList,
  });

  next();
});

exports.updatePackingList = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Packing List Id ${id}`);
  const { body } = req;

  // parse through models
  const packingListToUpdate = new PackingList(body);
  console.log(body);
  const doc = packingListToUpdate.toObject();
  delete doc._id;

  if (packingListToUpdate.box) {
    const len = packingListToUpdate.box.length;
    console.log(len);
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const packingList = await PackingList.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Packing List Id=${id}`,
    data: { packingList },
  });

  next();
});

exports.deletePackingList = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Packing List Id ${id}`);
  const packingList = await PackingList.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Packing List Id=${id}`,
    data: { packingList },
  });

  next();
});
