/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const DirectoryEntries = require('./../../models/direcctory/directoryEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectoryEntries = async (req, res, next) => {
  console.log('Getting All DirectoryEntries');

  try {
    const directories = await DirectoryEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All DirectoryEntries',
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

exports.getDirectoryEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting DirectoryEntries for Id ${id}`);

  try {
    const directoryEntries = await DirectoryEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got DirectoryEntries Id=${id}`,
      Data: { directoryEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createDirectoryEntries = async (req, res, next) => {
  console.log('Creating directoryEntries');

  try {
    const directoryEntries = await DirectoryEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created DirectoryEntries',
      data: { directoryEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateDirectoryEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating DirectoryEntries Id ${id}`);

  try {
    const directoryEntries = await DirectoryEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated DirectoryEntries Id=${id}`,
      data: { directoryEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteDirectoryEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DirectoryEntries Id ${id}`);

  try {
    const directoryEntries = await DirectoryEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted DirectoryEntries Id=${id}`,
      data: { directoryEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};