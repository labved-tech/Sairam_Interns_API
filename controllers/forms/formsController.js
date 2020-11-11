/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Forms = require('../../models/forms/formsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllForms = catchAsync(async (req, res, next) => {
  console.log('Getting All forms');

  const forms = await Forms.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All forms',
    results: forms.length,
    data: {
      forms,
    },
  });

  next();
});

exports.getForms = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting forms for Id ${id}`);

  const forms = await Forms.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got forms Id=${id}`,
    Data: { forms },
  });

  next();
});

exports.createForms = catchAsync(async (req, res, next) => {
  console.log('Creating forms');
  const { body } = req;
  // parse through models
  const doc = new Forms(body);
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

  const forms = await Forms.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created forms',
    data: { forms },
  });

  next();
});

exports.updateForms = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Forms Id ${id}`);

  // parse through models
  const FormsToUpdate = new Forms(body);
  console.log(body);
  const doc = FormsToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const forms = await Forms.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated forms Id=${id}`,
    data: { forms },
  });

  next();
});

exports.deleteForms = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting forms Id ${id}`);

  const forms = await Forms.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted forms Id=${id}`,
    data: { forms },
  });

  next();
});
