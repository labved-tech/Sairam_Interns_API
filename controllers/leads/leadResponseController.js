/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const LeadResponse = require('./../../models/leads/leadResponseModel');

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
    status: 'sucess',
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
    status: 'sucess',
    message: `Got LeadResponse Id=${id}`,
    Data: { leadResponse },
  });

  next();
});

exports.createLeadResponse = catchAsync(async (req, res, next) => {
  console.log('Creating LeadResponse');
  // parse through models
  const doc = new LeadResponse(req.body);
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
  const leadResponse = await LeadResponse.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created LeadResponse',
    data: { leadResponse },
  });
  next();
});

exports.updateLeadResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating LeadResponse Id ${id}`);

  const leadResponse = await LeadResponse.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
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
    status: 'sucess',
    message: `Deleted LeadResponse Id=${id}`,
    data: { leadResponse },
  });

  next();
});