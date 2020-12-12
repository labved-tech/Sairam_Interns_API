/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const AnnouncementNotify = require('../../models/announcement/announcementNotifyModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableAnnounementNotify = catchAsync(async (req, res, next) => {
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

  query = AnnounementNotify.find(searchObj);

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
    numRecords = await AnnounementNotify.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const announementNotify = await query;
  //announementNotify = await Example.find();
  //console.log(announementNotify);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Example',
    announementNotify,
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

exports.getAllAnnouncementNotify = catchAsync(async (req, res, next) => {
  console.log('Getting All Announcement Notify');

  const announcementNotify = await AnnouncementNotify.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Announcement Notify',
    results: announcementNotify.length,
    data: {
      announcementNotify,
    },
  });

  next();
});

exports.getAnnouncementNotify = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Announcement Notify for Id ${id}`);

  const announcementNotify = await AnnouncementNotify.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Announcement Notify Id=${id}`,
    Data: { announcementNotify },
  });

  next();
});

exports.createAnnouncementNotify = catchAsync(async (req, res, next) => {
  console.log('Creating Announcement Notify');
  const {body} = req;
  // parse through models
  const doc = new AnnouncementNotify(body);
  console.log(body);
  

//recipient

if (doc.recipient) {
  const recipientLength = doc.recipient.length;
  console.log(`Array of objects length ${recipientLength}`);

  for (let i = 0; i < recipientLength; i++) {
    doc.recipient[i].createdBy = '5f990bb3c727e952a076f3b7';
    doc.recipient[i].updatedBy = '5f990bb3c727e952a076f3b7';
    doc.recipient[i].createdAt = Date.now();
    doc.recipient[i].updatedAt = Date.now();
  }
}

  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  
  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const announcementNotify = await AnnouncementNotify.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Announcement Notify',
    data: { announcementNotify },
  });

  next();
});

exports.updateAnnouncementNotify = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Announcement Notify Id ${id}`);
  const {body} = req;
// parse through models
const announcementNotifyToUpdate = new AnnouncementNotify(body);
console.log(body);
const doc = announcementNotifyToUpdate.toObject();
delete doc._id;

if (announcementNotifyToUpdate.announcementNotify) {
  const len = announcementNotifyToUpdate.announcementNotify.length;
  console.log(len);
}

// update timestamps & Id's
doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
doc.updatedAt;

// check the doc before doing database operation
//console.log(doc);
  const announcementNotify = await AnnouncementNotify.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Announcement Notify Id=${id}`,
    data: { announcementNotify },
  });

  next();
});

exports.deleteAnnouncementNotify = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Announcement Notify Id ${id}`);

  const announcementNotify = await AnnouncementNotify.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Announcement Notify Id=${id}`,
    data: { announcementNotify },
  });

  next();
});
