/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const LeadCategories = require('./../../models/leads/leadCategoriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllLeadCategories = catchAsync(async (req, res, next) => {
  console.log('Getting All leadCategories');

  const leadCategories = await LeadCategories.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All leadCategories',
    results: leadCategories.length,
    data: {
      leadCategories,
    },
  });

  next();
});

exports.getLeadCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting leadCategories for Id ${id}`);

  const leadCategories = await LeadCategories.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got leadCategories Id=${id}`,
    Data: { leadCategories },
  });
  next();
});

exports.createLeadCategories = catchAsync(async (req, res, next) => {
  console.log('Creating leadCategories');

  // parse through models
    const doc = new LeadCategories(req.body);
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

  const leadCategories = await LeadCategories.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created leadCategories',
    data: { leadCategories },
  });
  next();
});

exports.updateLeadCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating leadCategories Id ${id}`);
  const leadCategories = await LeadCategories.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated leadCategories Id=${id}`,
    data: { leadCategories },
  });

  next();
});

exports.deleteLeadCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting leadCategories Id ${id}`);
  const leadCategories = await LeadCategories.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted leadCategories Id=${id}`,
    data: { leadCategories },
  });

  next();
});
