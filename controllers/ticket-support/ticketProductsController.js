/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Ticketproducts = require('../../models/ticket-support/ticketProductsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTicketProducts = catchAsync(async (req, res, next) => {
  console.log('Getting All Ticketproducts');

  const ticketproducts = await Ticketproducts.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Ticketproducts',
      results: ticketproducts.length,
      data: {
        ticketproducts,
      },
    });
  
  next();
});

exports.getTicketProducts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Ticketproducts for Id ${id}`);

  const ticketproducts = await Ticketproducts.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Ticketproducts Id=${id}`,
      Data: { ticketproducts },
    });

  next();
});

exports.createTicketProducts = catchAsync(async (req, res, next) => {
  console.log('Creating Ticketproducts');

    // parse through models
    const doc = new Ticketproducts(req.body);
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
  const ticketproducts = await Ticketproducts.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Ticketproducts',
      data: { ticketproducts },
    });

  next();
});

exports.updateTicketProducts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Ticketproducts Id ${id}`);
  
  const ticketproducts = await Ticketproducts.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Ticketproducts Id=${id}`,
    data: { ticketproducts },
  }); 
  
  next();
});

exports.deleteTicketProducts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Ticketproducts Id ${id}`);

  const ticketproducts = await Ticketproducts.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted Ticketproducts Id=${id}`,
      data: { ticketproducts },
    });
 
  next();
});
