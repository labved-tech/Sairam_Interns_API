/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const appError = require('../../utils/appError');
const NewsletterEntries = require('../../models/newsletter/newsletterEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableNewsletterEntries = catchAsync(async (req, res, next) => {
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

  query = NewsletterEntries.find(searchObj);

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
    numRecords = await NewsletterEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const newsletterEntries = await query;
  //newsletterEntries = await Example.find();
  //console.log(newsletterEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Example',
    newsletterEntries,
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

exports.getAllNewsletterEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All Newsletter Entries');
  const newsletterEntriess = await NewsletterEntries.find();

  res.status(200).json({
    status: 'success',
    message: 'Got All Newsletter Entries',
    results: newsletterEntriess.length,
    data: {
      newsletterEntriess,
    },
  });
  next();
});

exports.getNewsletterEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Newsletter Entries for Id ${id}`);
  const newsletterEntries = await NewsletterEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Newsletter Entries Id=${id}`,
    Data: { newsletterEntries },
  });
  next();
});

exports.createNewsletterEntries = catchAsync(async (req, res, next) => {
  console.log('Creating Newsletter Entries');
  const { body } = req;

  // parse through models
  const doc = new NewsletterEntries(body);
  console.log(body);

  //extRefObject

  //lists
  if (doc.lists) {
    const listsLength = doc.lists.length;
    console.log(`Array of objects length ${listsLength}`);

    for (let i = 0; i < listsLength; i++) {
      doc.lists[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.lists[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.lists[i].createdAt = Date.now();
      doc.lists[i].updatedAt = Date.now();
    }
  }
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const newsletterEntries = await NewsletterEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Newsletter Entries',
    data: { newsletterEntries },
  });
  next();
});

exports.updateNewsletterEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Newsletter Entries Id ${id}`);

  // parse through models
  const newsletterEntriesToUpdate = new NewsletterEntries(body);
  console.log(body);
  const doc = newsletterEntriesToUpdate.toObject();
  delete doc._id;

  if (newsletterEntriesToUpdate.lists) {
    const len = newsletterEntriesToUpdate.lists.length;
    console.log(len);
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  //console.log(doc);
  const newsletterEntries = await NewsletterEntries.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Newsletter Entries Id=${id}`,
    data: { newsletterEntries },
  });
  next();
});

exports.deleteNewsletterEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Newsletter Entries Id ${id}`);
  const newsletterEntries = await NewsletterEntries.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Newsletter Entries Id=${id}`,
    data: { newsletterEntries },
  });
  next();
});
