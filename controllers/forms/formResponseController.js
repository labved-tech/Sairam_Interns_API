/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const FormResponse = require('../../models/forms/formResponseModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFormResponse = catchAsync(async (req, res, next) => {
  console.log('Getting All formResponse');


    const formResponses = await FormResponse.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All formResponse',
      results: formResponses.length,
      data: {
        formResponses,
      },
    });


  next();
});

exports.getFormResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting formResponse for Id ${id}`);


    const formResponse = await FormResponse.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got formResponse Id=${id}`,
      Data: { formResponse },
    });


  next();
});

exports.createFormResponse = catchAsync(async (req, res, next) => {
  console.log('Creating formResponse');
    // parse through models
    const doc = new FormResponse(req.body);
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

    const formResponse = await FormResponse.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created formResponse',
      data: { formResponse },
    });


  next();
});

exports.updateFormResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating formResponse Id ${id}`);


    const formResponse = await FormResponse.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated formResponse Id=${id}`,
      data: { formResponse },
    });


  next();
});

exports.deleteFormResponse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting formResponse Id ${id}`);


    const formResponse = await FormResponse.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted formResponse Id=${id}`,
      data: { formResponse },
    });


  next();
});
