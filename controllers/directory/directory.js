/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Directory = require('./../../models/direcctory/directoryModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectory = async (req, res, next) => {
  console.log('Getting All Directory');

  try {
    const directories = await Directory.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Directory',
      results: directories.length,
      data: {
        directories,
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

exports.getDirectory = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Directory for Id ${id}`);

  try {
    const directory = await Directory.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Directory Id=${id}`,
      Data: { directory },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createDirectory = async (req, res, next) => {
  console.log('Creating directory');

  try {
    const directory = await Directory.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Directory',
      data: { directory },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateDirectory = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Directory Id ${id}`);

  try {
    const directory = await Directory.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Directory Id=${id}`,
      data: { directory },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteDirectory = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Directory Id ${id}`);

  try {
    const directory = await Directory.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted Directory Id=${id}`,
      data: { directory },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
