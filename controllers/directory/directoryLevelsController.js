/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const DirectoryLevels = require('./../../models/directory/directoryLevelsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectoryLevels = async (req, res, next) => {
  console.log('Getting All DirectoryLevels');

  try {
    const directories = await DirectoryLevels.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All DirectoryLevels',
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

exports.getDirectoryLevels = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting DirectoryLevels for Id ${id}`);

  try {
    const directoryLevels = await DirectoryLevels.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got DirectoryLevels Id=${id}`,
      Data: { directoryLevels },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createDirectoryLevels = async (req, res, next) => {
  console.log('Creating directoryLevels');

  try {
    const directoryLevels = await DirectoryLevels.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created DirectoryLevels',
      data: { directoryLevels },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateDirectoryLevels = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating DirectoryLevels Id ${id}`);

  try {
    const directoryLevels = await DirectoryLevels.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated DirectoryLevels Id=${id}`,
      data: { directoryLevels },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteDirectoryLevels = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DirectoryLevels Id ${id}`);

  try {
    const directoryLevels = await DirectoryLevels.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted DirectoryLevels Id=${id}`,
      data: { directoryLevels },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};