/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TicketCategories = require('../../models/ticket-support/ticketCategoriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTicketCategories = catchAsync(async (req, res, next) => {
  console.log('Getting All TicketCategories');

  const ticketCategories = await TicketCategories.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All TicketCategories',
      results: ticketCategories.length,
      data: {
        ticketCategories,
      },
    });
  
  next();
});

exports.getTicketCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting TicketCategories for Id ${id}`);

  const ticketCategories = await TicketCategories.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got TicketCategories Id=${id}`,
      Data: { ticketCategories },
    });
  
  next();
});

exports.createTicketCategories =catchAsync( async (req, res, next) => {
  console.log('Creating TicketCategories');

  //parse through models
  const doc = new TicketCategories(req.body);
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
  const ticketCategories = await TicketCategories.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created TicketCategories',
      data: { ticketCategories },
    });
  next();
});

exports.updateTicketCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating TicketCategories Id ${id}`);

  const ticketCategories = await TicketCategories.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated TicketCategories Id=${id}`,
    data: { ticketCategories },
  });
 
  next();
});

exports.deleteTicketCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting TicketCategories Id ${id}`);

  const ticketCategories = await TicketCategories.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted TicketCategories Id=${id}`,
      data: { ticketCategories },
    });
 
  next();
});
