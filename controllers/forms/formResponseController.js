/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const FormResponse = require('../../models/forms/formResponseModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableFormResponse = catchAsync(async (req, res, next) => {
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

  query = FormResponse.find(searchObj);

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
    numRecords = await FormResponse.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const formResponse = await query;
  //formResponse = await FormResponse.find();
  //console.log(formResponse);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All FormResponse',
    formResponse,
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


exports.getAllFormResponse = catchAsync(async (req, res, next) => {
  console.log('Getting All formResponse');

  const formResponses = await FormResponse.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All formResponse',
    results: formResponses.length,
    data: {
      formResponses,
    },
  });

  next();
});

exports.getFormResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting formResponse for Id ${id}`);

  const formResponse = await FormResponse.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got formResponse Id=${id}`,
    Data: { formResponse },
  });

  next();
});

exports.createFormResponse = catchAsync(async (req, res, next) => {
  console.log('Creating formResponse');
  const { body } = req;
  // parse through models
  const doc = new FormResponse(body);
  console.log(doc);

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

  const formResponse = await FormResponse.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created formResponse',
    data: { formResponse },
  });

  next();
});

exports.updateFormResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating FormResponse Id ${id}`);

  // parse through models
  const FormResponseToUpdate = new FormResponse(body);
  console.log(body);
  const doc = FormResponseToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const formResponse = await FormResponse.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated formResponse Id=${id}`,
    data: { formResponse },
  });

  next();
});

exports.deleteFormResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting formResponse Id ${id}`);

  const formResponse = await FormResponse.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted formResponse Id=${id}`,
    data: { formResponse },
  });

  next();
});
