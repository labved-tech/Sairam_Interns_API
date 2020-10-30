/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../utils/catchAsync');
const Example = require('../models/exampleModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllExample = catchAsync(async (req, res, next) => {
  console.log('Getting All Example');

  const examples = await Example.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Example',
    results: examples.length,
    data: {
      examples,
    },
  });
});

exports.getExample = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Example for Id ${id}`);

  const example = await Example.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Example Id=${id}`,
    Data: { example },
  });
});

exports.createExample = catchAsync(async (req, res, next) => {
  console.log('Creating Example');

  const example = await Example.create(req.body).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Example',
    data: { example },
  });
});

exports.updateExample = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Example Id ${id}`);

  const example = await Example.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Example Id=${id}`,
    data: { example },
  });
});

exports.deleteExample = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Example Id ${id}`);

  const example = await Example.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Example Id=${id}`,
    data: { example },
  });
});
