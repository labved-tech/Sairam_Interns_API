/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TicketResponse = require('../../models/ticket-support/ticketResponseModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTicketResponse = catchAsync(async (req, res, next) => {
  console.log('Getting All TicketResponse');

  const ticketResponse = await TicketResponse.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All TicketResponse',
      results: ticketResponse.length,
      data: {
        ticketResponse,
      },
    });

  next();
});

exports.getTicketResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting TicketResponse for Id ${id}`);

  const ticketResponse = await TicketResponse.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got TicketResponse Id=${id}`,
      Data: { ticketResponse },
    });

  next();
});

exports.createTicketResponse = catchAsync(async (req, res, next) => {
  console.log('Creating TicketResponse');

  // parse through models
  const doc = new EventEntries(req.body);
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
  const ticketResponse = await TicketResponse.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created TicketResponse',
      data: { ticketResponse },
    });

  next();
});

exports.updateTicketResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating TicketResponse Id ${id}`);

  const ticketResponse = await TicketResponse.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated TicketResponse Id=${id}`,
    data: { ticketResponse },
  });

  next();
});

exports.deleteTicketResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting TicketResponse Id ${id}`);

  const ticketResponse = await TicketResponse.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted TicketResponse Id=${id}`,
    data: { ticketResponse },
  });

  next();
});
