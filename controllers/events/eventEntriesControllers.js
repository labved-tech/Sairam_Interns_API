/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const EventEntries = require('../../models/events/eventEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEventEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All EventEntries');

  const eventEntries = await EventEntries.find().then();
  res.status(200).json({
    status: 'success',
    message: 'Got All EventEntries',
    results: eventEntries.length,
    data: {
      eventEntries,
    },
  });

  next();
});

exports.getEventEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EventEntries for Id ${id}`);

  const eventEntries = await EventEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got EventEntries Id=${id}`,
    Data: { eventEntries },
  });

  next();
});

exports.createEventEntries = catchAsync(async (req, res, next) => {
  console.log('Creating Event Entries');

  // parse through models
  const doc = new EventEntries(req.body);
  console.log(doc);

  // validate seperately sub-documents if necessary

  // replace doc if necessary

  //update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(doc);
  const eventEntries = await EventEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Event Entries',
    eventEntries,
  });
});

exports.updateEventEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating EventEntries Id ${id}`);

  // parse through models
  const EventEntriesToUpdate = new EventEntries(body);
  console.log(body);
  const doc = EventEntriesToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const eventEntries = await EventEntries.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated EventEntries Id=${id}`,
    data: { eventEntries },
  });

  next();
});

exports.deleteEventEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EventEntries Id ${id}`);

  const eventEntries = await EventEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted EventEntries Id=${id}`,
    data: { eventEntries },
  });

  next();
});
