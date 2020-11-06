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
  const { body } = req;

  // parse through models
  const doc = new LeadEntries(body);

  // extRefObject
  
  //  contactInformation
  if (doc.contactInformation) {
    const contactInformationLength = doc.contactInformation.length;
    console.log(`Array of objects length ${contactInformationLength}`);

    for (let i = 0; i < contactInformationLength; i++) {
      doc.contactInformation[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.contactInformation[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.contactInformation[i].createdAt = Date.now();
      doc.contactInformation[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(`After Validation :${doc}`);

  //const LeadEntries = await doc.save({ validateBeforeSave: false });


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
  const { body } = req;
  console.log(`Updating LeadEntries Id ${id}`);

  // parse through models
  const LeadEntriesToUpdate = new LeadEntries(body);
  console.log(body);
  const doc = LeadEntriesToUpdate.toObject();
  delete doc._id;

  if (LeadEntriesToUpdate.contactInformation) {
    const len = LeadEntriesToUpdate.contactInformation.length;
    console.log(len);
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);


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
