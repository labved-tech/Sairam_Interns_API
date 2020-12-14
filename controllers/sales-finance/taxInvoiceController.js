/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TaxInvoice = require('../../models/sales-finance/taxInvoiceModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};
exports.getAllTableTaxInvoice = catchAsync(async (req, res, next) => {
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

  query = TaxInvoice.find(searchObj);

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
    numRecords = await TaxInvoice.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const taxInvoice = await query;
  //taxInvoice = await TaxInvoice.find();
  //console.log(taxInvoice);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Tax Invoice',
    taxInvoice,
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


exports.getAllTaxInvoice = catchAsync(async (req, res, next) => {
  console.log('Getting All Tax Invoice');
  const taxInvoices = await TaxInvoice.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Tax Invoice',
    results: taxInvoices.length,
    data: {
      taxInvoices,
    },
  });
  next();
});

exports.getTaxInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Tax Invoice for Id ${id}`);
  const taxInvoice = await TaxInvoice.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Tax Invoice Id=${id}`,
    Data: { taxInvoice },
  });
  next();
});

exports.createTaxInvoice = catchAsync(async (req, res, next) => {
  console.log('Creating Tax Invoice');
  const { body } = req;

  // parse through models
  const doc = new TaxInvoice(body);
  console.log(body);

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

  const taxInvoice = await TaxInvoice.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Tax Invoice',
    data: { taxInvoice },
  });
  next();
});

exports.updateTaxInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Tax Invoice Id ${id}`);
  const { body } = req;

  // parse through models
  const taxInvoiceToUpdate = new TaxInvoice(body);
  console.log(body);
  const doc = taxInvoiceToUpdate.toObject();
  delete doc._id;

  if (taxInvoiceToUpdate.itemTable) {
    const len = taxInvoiceToUpdate.itemTable.length;
    console.log(len);
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const taxInvoice = await TaxInvoice.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Tax Invoice Id=${id}`,
    data: { taxInvoice },
  });
  next();
});

exports.deleteTaxInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Tax Invoice Id ${id}`);
  const taxInvoice = await TaxInvoice.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Tax Invoice Id=${id}`,
    data: { taxInvoice },
  });
  next();
});
