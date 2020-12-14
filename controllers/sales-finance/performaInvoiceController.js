/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const PerformaInvoice = require('../../models/sales-finance/performaInvoiceModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};
exports.getAllTablePerformaInvoice = catchAsync(async (req, res, next) => {
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

  query = PerformaInvoice.find(searchObj);

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
    numRecords = await PerformaInvoice.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const performaInvoice = await query;
  //performaInvoice = await PerformaInvoice.find();
  //console.log(performaInvoice);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Performa Invoice',
    performaInvoice,
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


exports.getAllPerformaInvoice = catchAsync(async (req, res, next) => {
  console.log('Getting All Performa Invoice ');
  const performaInvoice = await PerformaInvoice.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Performa Invoice ',
    results: performaInvoice.length,
    data: {
      performaInvoice,
    },
  });

  next();
});

exports.getPerformaInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Performa Invoice for Id ${id}`);
  const performaInvoice = await PerformaInvoice.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Performa Invoice Id=${id}`,
    Data: { performaInvoice },
  });
  next();
});

exports.createPerformaInvoice = catchAsync(async (req, res, next) => {
  console.log('Creating Performa Invoice');
  const { body } = req;

  // parse through models
  const doc = new PerformaInvoice(body);
  console.log(body);

  //paymentMethods
  if (doc.paymentMethods) {
    const paymentMethodsLength = doc.paymentMethods.length;
    console.log(`Array of objects length ${paymentMethodsLength}`);

    for (let i = 0; i < paymentMethodsLength; i++) {
      doc.paymentMethods[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.paymentMethods[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.paymentMethods[i].createdAt = Date.now();
      doc.paymentMethods[i].updatedAt = Date.now();
    }
  }
  //itemTable
  if (doc.itemTable) {
    const itemTableLength = doc.itemTable.length;
    console.log(`Array of objects length ${itemTableLength}`);

    for (let i = 0; i < itemTableLength; i++) {
      doc.itemTable[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.itemTable[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.itemTable[i].createdAt = Date.now();
      doc.itemTable[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const performaInvoice = await PerformaInvoice.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Performa Invoice',
    data: { performaInvoice },
  });
  next();
});

exports.updatePerformaInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Performa Invoice Id ${id}`);
  const { body } = req;

  // parse through models
  const performaInvoiceToUpdate = new PerformaInvoice(body);
  console.log(body);
  const doc = performaInvoiceToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const performaInvoice = await PerformaInvoice.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Performa Invoice Id=${id}`,
    data: { performaInvoice },
  });

  next();
});

exports.deletePerformaInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Performa Invoice Id ${id}`);
  const performaInvoice = await PerformaInvoice.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Performa Invoice Id=${id}`,
    data: { performaInvoice },
  });

  next();
});
