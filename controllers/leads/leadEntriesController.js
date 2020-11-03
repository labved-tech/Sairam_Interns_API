/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const LeadEntries = require('../../models/leads/leadEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllLeadEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All LeadEntries');

  const leadEntries = await LeadEntries.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All LeadEntries',
    results: leadEntries.length,
    data: {
      leadEntries,
    },
  });
  next();
});

exports.getLeadEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Lead Entries for Id ${id}`);

  const leadEntries = await LeadEntries.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got leadEntries Id=${id}`,
    Data: { leadEntries },
  });
  next();
});

exports.createLeadEntries = catchAsync(async (req, res, next) => {
  console.log('Creating LeadEntries');

  // parse through models
  const doc = new LeadEntries(req.body);
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
  
  const leadEntries = await LeadEntries.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created leadEntries',
    data: { leadEntries },
  });
  next();
});

exports.updateLeadEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Lead Entries Id ${id}`);

  const leadEntries = await LeadEntries.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated leadEntries Id=${id}`,
    data: { leadEntries },
  });
  next();
});

exports.deleteLeadEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Lead Entries Id ${id}`);

  const leadEntries = await LeadEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted LeadEntries Id=${id}`,
    data: { leadEntries },
  });
  next();
});
