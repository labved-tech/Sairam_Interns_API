/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const EcommerceStock = require('../../models/ecommerce/ecommerceStockModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableEcommerceStock = catchAsync(async (req, res, next) => {
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

  query = EcommerceStock.find(searchObj);

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
    numRecords = await EcommerceStock.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const ecommerceStock = await query;
  //ecommerceStock = await EcommerceStock.find();
  //console.log(ecommerceStock);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All EcommerceStock',
    ecommerceStock,
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


exports.getAllEcommerceStock = catchAsync(async (req, res, next) => {
  console.log('Getting All EcommerceStock');

  const ecommerceStocks = await EcommerceStock.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All EcommerceStock',
    results: ecommerceStocks.length,
    data: {
      ecommerceStocks,
    },
  });

  next();
});

exports.getEcommerceStock = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceStock for Id ${id}`);

  const ecommerceStock = await EcommerceStock.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got EcommerceStock Id=${id}`,
    Data: { ecommerceStock },
  });

  next();
});

exports.createEcommerceStock = catchAsync(async (req, res, next) => {
  console.log('Creating EcommerceStock');
  const { body } = req;

  // parse through models
  const doc = new EcommerceStock(req.body);

  //  discount
  if (doc.discount) {
    const discountLength = doc.discount.length;
    console.log(`discount length ${discountLength}`);

    for (let i = 0; i < discountLength; i++) {
      doc.discount[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.discount[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.discount[i].createdAt = Date.now();
      doc.discount[i].updatedAt = Date.now();
    }
  }

  // tax
  if (doc.tax) {
    const taxLength = doc.tax.length;
    console.log(`tax length ${taxLength}`);

    for (let i = 0; i < taxLength; i++) {
      doc.tax[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.tax[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.tax[i].createdAt = Date.now();
      doc.tax[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);
  //console.log(doc);

  const ecommerceStock = await EcommerceStock.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created EcommerceStock',
    data: { ecommerceStock },
  });

  next();
});

exports.updateEcommerceStock = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating EcommerceStock Id ${id}`);

  // parse through models
  const EcommerceStockToUpdate = new EcommerceStock(body);
  console.log(body);
  const doc = EcommerceStockToUpdate.toObject();
  delete doc._id;

  if (EcommerceStockToUpdate.discount) {
    const discountLength = doc.discount.length;
    console.log(`Array of objects length ${discountLength}`);

    for (let i = 0; i < discountLength; i++) {
      doc.discount[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.discount[i].updatedAt = Date.now();
    }
  }
  if (EcommerceStockToUpdate.tax) {
    const taxLength = doc.tax.length;
    console.log(`Array of objects length ${taxLength}`);

    for (let i = 0; i < taxLength; i++) {
      doc.tax[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.tax[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const ecommerceStock = await EcommerceStock.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated EcommerceStock Id=${id}`,
    data: { ecommerceStock },
  });

  next();
});

exports.deleteEcommerceStock = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceStock Id ${id}`);

  const ecommerceStock = await EcommerceStock.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted EcommerceStock Id=${id}`,
    data: { ecommerceStock },
  });

  next();
});
