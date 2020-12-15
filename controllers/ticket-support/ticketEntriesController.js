/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TicketEntries = require('../../models/ticket-support/ticketEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableTicketEntries = catchAsync(async (req, res, next) => {
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

  query = TicketEntries.find(searchObj);

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
    numRecords = await TicketEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const ticketEntries = await query;
  //ticketEntries = await TicketEntries.find();
  console.log(ticketEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Ticket Entries Table',
    ticketEntries,
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


exports.getAllTicketEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All TicketEntries');

  const ticketEntries = await TicketEntries.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All TicketEntries',
    results: ticketEntries.length,
    data: {
      ticketEntries,
    },
  });

  next();
});

exports.getTicketEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting TicketEntries for Id ${id}`);

  const ticketEntries = await TicketEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got TicketEntries Id=${id}`,
    Data: { ticketEntries },
  });

  next();
});

exports.createTicketEntries = async (req, res, next) => {
  console.log('Creating TicketEntries');

  // parse through models
  const doc = new TicketEntries(req.body);
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
  const ticketEntries = await TicketEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created TicketEntries',
    data: { ticketEntries },
  });

  next();
};

exports.updateTicketEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating TicketEntries Id ${id}`);

  // parse through models
  const TicketEntriesToUpdate = new TicketEntries(body);
  console.log(body);
  const doc = TicketEntriesToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const ticketEntries = await TicketEntries.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated TicketEntries Id=${id}`,
    data: { ticketEntries },
  });

  next();
});

exports.deleteTicketEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting TicketEntries Id ${id}`);

  const ticketEntries = await TicketEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted TicketEntries Id=${id}`,
    data: { ticketEntries },
  });
  next();
});
