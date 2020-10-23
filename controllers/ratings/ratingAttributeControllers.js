/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Example = require('../models/exampleModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllExample = async (req, res, next) => {
  console.log('Getting All Example');

  try {
    const examples = await Example.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Example',
      results: examples.length,
      data: {
        examples,
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

exports.getExample = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Example for Id ${id}`);

  try {
    const example = await Example.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Example Id=${id}`,
      Data: { example },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createExample = async (req, res, next) => {
  console.log('Creating Example');

  try {
    const example = await Example.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Example',
      data: { example },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateExample = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Example Id ${id}`);

  try {
    const example = await Example.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Example Id=${id}`,
      data: { example },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteExample = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Example Id ${id}`);

  try {
    const example = await Example.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted Example Id=${id}`,
      data: { example },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
