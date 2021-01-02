/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const LeadEntries = require('../../models/leads/leadEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableLeadEntries = catchAsync(async (req, res, next) => {
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

  query = LeadEntries.find(searchObj);

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
    numRecords = await LeadEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const leadEntries = await query;
  //leadEntries = await LeadEntries.find();
  //console.log(leadEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All LeadEntries',
    leadEntries,
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

exports.getAllLeadEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All LeadEntries');

  const leadEntries = await LeadEntries.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All LeadEntries',
    results: leadEntries.length,
    data: {
      leadEntries,
    },
  });
  next();
});

exports.getLeadEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Lead Entries for Id ${id}`);

  const leadEntries = await LeadEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got leadEntries Id=${id}`,
    Data: { leadEntries },
  });
  next();
});

exports.createLeadEntries = catchAsync(async (req, res, next) => {
  console.log('Creating LeadEntries');
  const { body } = req;
  console.log('rawBody :', body);
  console.log(body.contactInformation.type);
  console.log(body.contactInformation.isPublic);

  // parse through models
  const doc = new LeadEntries(body);

  //  contactInformations
  if (doc.contactInformation) {
    const contactInformationLength = doc.contactInformation.length;
    console.log(`Array of objects length ${contactInformationLength}`);

    for (let i = 0; i < contactInformationLength; i++) {
      doc.contactInformation[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.contactInformation[i].createdAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(`After Validation :${doc}`);

  //const leadEntries = await doc.save({ validateBeforeSave: false });

  const leadEntries = await LeadEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created leadEntries',
    data: { leadEntries },
  });
  next();
});

exports.updateLeadEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating LeadEntries Id ${id}`);

  // parse through models
  const LeadEntriesToUpdate = new LeadEntries(body);
  console.log(body);
  const doc = LeadEntriesToUpdate.toObject();
  delete doc._id;

  if (LeadEntriesToUpdate.contactInformation) {
    const contactInformationLength = doc.contactInformation.length;
    console.log(`Array of objects length ${contactInformationLength}`);

    for (let i = 0; i < contactInformationLength; i++) {
      doc.contactInformation[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.contactInformation[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const leadEntries = await LeadEntries.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated leadEntries Id=${id}`,
    data: { leadEntries },
  });
  next();
});

exports.deleteLeadEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Lead Entries Id ${id}`);

  const leadEntries = await LeadEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted LeadEntries Id=${id}`,
    data: { leadEntries },
  });
  next();
});
