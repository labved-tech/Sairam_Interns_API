/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const EcommerceLocations = require('../../models/ecommerce/ecommerceLocationsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableEcommerceLocations = catchAsync(async (req, res, next) => {
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

  query = EcommerceLocations.find(searchObj);

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
    numRecords = await EcommerceLocations.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const ecommerceLocations = await query;
  //ecommerceLocations = await EcommerceLocations.find();
  //console.log(ecommerceLocations);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All EcommerceLocations',
    ecommerceLocations,
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


exports.getAllEcommerceLocations = catchAsync(async (req, res, next) => {
  console.log('Getting All EcommerceLocations');

  const ecommerceLocationss = await EcommerceLocations.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All EcommerceLocations',
    results: ecommerceLocationss.length,
    data: {
      ecommerceLocationss,
    },
  });

  next();
});

exports.getEcommerceLocations = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceLocations for Id ${id}`);

  const ecommerceLocations = await EcommerceLocations.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got EcommerceLocations Id=${id}`,
    Data: { ecommerceLocations },
  });

  next();
});

exports.createEcommerceLocations = catchAsync(async (req, res, next) => {
  console.log('Creating EcommerceLocations');
  const { body } = req;

  // parse through models
  const doc = new EcommerceLocations(req.body);

  //  verifyDocuments
  if (doc.verifyDocuments) {
    const verifyDocumentsLength = doc.verifyDocuments.length;
    console.log(`verifyDocuments length ${verifyDocumentsLength}`);

    for (let i = 0; i < verifyDocumentsLength; i++) {
      doc.verifyDocuments[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.verifyDocuments[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.verifyDocuments[i].createdAt = Date.now();
      doc.verifyDocuments[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';


  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);

  const ecommerceLocations = await EcommerceLocations.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created EcommerceLocations',
    data: { ecommerceLocations },
  });

  next();
});

exports.updateEcommerceLocations = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating EcommerceLocations Id ${id}`);

  // parse through models
  const EcommerceLocationsToUpdate = new EcommerceLocations(body);
  console.log(body);
  const doc = EcommerceLocationsToUpdate.toObject();
  delete doc._id;



  if (EcommerceLocationsToUpdate.admins) {
    const verifyDocumentsLength = doc.verifyDocuments.length;
    console.log(`Array of objects length ${verifyDocumentsLength}`);

    for (let i = 0; i < verifyDocumentsLength; i++) {
      doc.verifyDocuments[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.verifyDocuments[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const ecommerceLocations = await EcommerceLocations.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated EcommerceLocations Id=${id}`,
    data: { ecommerceLocations },
  });

  next();
});

exports.deleteEcommerceLocations = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceLocations Id ${id}`);

  const ecommerceLocations = await EcommerceLocations.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted EcommerceLocations Id=${id}`,
    data: { ecommerceLocations },
  });

  next();
});
