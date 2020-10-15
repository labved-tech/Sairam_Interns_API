/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Example = require('../models/exampleModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const id = req.params.id * 1;
  console.log(`ID is ${id}`);
  next();
};
exports.getAllExample = async (req, res, next) => {
  console.log('Getting All Example');

  try {
    const examples = await Example.find();

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

exports.getOneExample = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting One Example for Id ${id}`);

  try {
    const example = await Example.findById(id);
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
  console.log('Created Example');

  try {
    const newExample = await Example.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Example',
      data: {
        example: newExample,
      },
    });
  } catch (err) {
    req.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateExample = (req, res, next) => {
  const id = req.params.id * 1;
  console.log(`Updated Example Id ${id}`);
  res
    .status(200)
    .json({ status: 'sucess', message: `Updated Example Id=${id}` });
  next();
};

exports.deleteExample = (req, res, next) => {
  const id = req.params.id * 1;
  console.log(`Delete Example Id ${id}`);
  res.status(200).json({ app: 'sucess', message: `Deleted Example Id=${id}` });
  next();
};
