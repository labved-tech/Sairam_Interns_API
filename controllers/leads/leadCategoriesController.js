/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const LeadCategories = require('../../models/leads/leadCategoriesModel');

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
    status: 'success',
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
    status: 'success',
    message: `Got leadCategories Id=${id}`,
    Data: { leadCategories },
  });
  next();
});

exports.createLeadCategories = catchAsync(async (req, res, next) => {
  console.log('Creating leadCategories');
  const { body } = req;

  // parse through models
  const doc = new LeadCategories(body);
  console.log(doc);

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;

  // final validation
  await doc.validate();

  const leadCategories = await LeadCategories.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created lead Categories',
    data: { leadCategories },
  });
  next();
});

exports.updateLeadCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating LeadCategories Id ${id}`);

  // parse through models
  const LeadCategoriesToUpdate = new LeadCategories(body);
  console.log(body);
  const doc = LeadCategoriesToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  const leadCategories = await LeadCategories.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
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
    status: 'success',
    message: `Deleted leadCategories Id=${id}`,
    data: { leadCategories },
  });

  next();
});
