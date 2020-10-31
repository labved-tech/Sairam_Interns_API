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

exports.getAllFormResponse = async (req, res, next) => {
  console.log('Getting All formResponse');

  try {
    const formResponses = await FormResponse.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All formResponse',
      results: formResponses.length,
      data: {
        formResponses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.getFormResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting formResponse for Id ${id}`);

  try {
    const formResponse = await FormResponse.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got formResponse Id=${id}`,
      Data: { formResponse },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createFormResponse = async (req, res, next) => {
  console.log('Creating formResponse');

  try {
    const formResponse = await FormResponse.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created formResponse',
      data: { formResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateFormResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating formResponse Id ${id}`);

  try {
    const formResponse = await FormResponse.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated formResponse Id=${id}`,
      data: { formResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteFormResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting formResponse Id ${id}`);

  try {
    const formResponse = await FormResponse.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted formResponse Id=${id}`,
      data: { formResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
