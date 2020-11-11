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
