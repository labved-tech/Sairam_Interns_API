/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const LeadResponse = require('../../models/leads/leadResponseModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllLeadResponse = catchAsync(async (req, res, next) => {
  console.log('Getting All LeadResponse');

  const leadResponses = await LeadResponse.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All LeadResponse',
    results: leadResponses.length,
    data: {
      leadResponses,
    },
  });
  next();
});

exports.getLeadResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting LeadResponse for Id ${id}`);

  const leadResponse = await LeadResponse.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got LeadResponse Id=${id}`,
    Data: { leadResponse },
  });

  next();
});

exports.createLeadResponse = catchAsync(async (req, res, next) => {
  console.log('Creating LeadResponse');
  const { body } = req;

  // parse through models
  const doc = new LeadResponse(body);
  console.log(doc);

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);
  const leadResponse = await LeadResponse.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created LeadResponse',
    data: { leadResponse },
  });
  next();
});

exports.updateLeadResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating LeadResponse Id ${id}`);

  // parse through models
  const LeadResponseToUpdate = new LeadResponse(body);
  console.log(body);
  const doc = LeadResponseToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const leadResponse = await LeadResponse.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated LeadResponse Id=${id}`,
    data: { leadResponse },
  });
  next();
});

exports.deleteLeadResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting LeadResponse Id ${id}`);

  const leadResponse = await LeadResponse.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted LeadResponse Id=${id}`,
    data: { leadResponse },
  });

  next();
});
