/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const DeliveryNote = require('./../../models/sales-finance/deliveryNoteModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDeliveryNote = catchAsync(async (req, res, next) => {
  console.log('Getting All Delivery Note');
  const deliveryNotes = await DeliveryNote.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Delivery Note',
    results: deliveryNotes.length,
    data: {
      deliveryNotes,
    },
  });
  
  next();
});

exports.getDeliveryNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Delivery Note for Id ${id}`);
  const deliveryNote = await DeliveryNote.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Delivery Note Id=${id}`,
    Data: { deliveryNote },
  });
  

  next();
});

exports.createDeliveryNote = catchAsync(async (req, res, next) => {
  console.log('Creating Delivery Note');
  // parse through models
  const doc = new DeliveryNote(req.body);
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

  const deliveryNote = await DeliveryNote.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Delivery Note',
    data: { deliveryNote },
  });
  

  next();
});

exports.updateDeliveryNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Delivery Note Id ${id}`);
  // parse through models
  const deliveryNoteToUpdate = new DeliveryNote(body);
  console.log(body);
  const doc = deliveryNoteToUpdate.toObject();
  delete doc._id;


  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const deliveryNote = await DeliveryNote.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Delivery Note Id=${id}`,
    data: { deliveryNote },
  });
  

  next();
});

exports.deleteDeliveryNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Delivery Note Id ${id}`);
  const deliveryNote = await DeliveryNote.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Delivery Note Id=${id}`,
    data: { deliveryNote },
  });
  next();
});
