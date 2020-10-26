/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const DirectoryCategories = require('./../../models/direcctory/directoryCategoriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectoryCategories = async (req, res, next) => {
  console.log('Getting All DirectoryCategories');

  try {
    const directories = await DirectoryCategories.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All DirectoryCategories',
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

exports.getDirectoryCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting DirectoryCategories for Id ${id}`);

  try {
    const directoryCategories = await DirectoryCategories.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got DirectoryCategories Id=${id}`,
      Data: { directoryCategories },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createDirectoryCategories = async (req, res, next) => {
  console.log('Creating directoryCategories');

  try {
    const directoryCategories = await DirectoryCategories.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created DirectoryCategories',
      data: { directoryCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateDirectoryCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating DirectoryCategories Id ${id}`);

  try {
    const directoryCategories = await DirectoryCategories.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated DirectoryCategories Id=${id}`,
      data: { directoryCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteDirectoryCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DirectoryCategories Id ${id}`);

  try {
    const directoryCategories = await DirectoryCategories.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted DirectoryCategories Id=${id}`,
      data: { directoryCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};