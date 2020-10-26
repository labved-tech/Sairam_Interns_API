/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const DirectoryAttributesGroups = require('./../../models/direcctory/directoryAttributesGroupsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectoryAttributesGroups = async (req, res, next) => {
  console.log('Getting All DirectoryAttributesGroups');

  try {
    const directories = await DirectoryAttributesGroups.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All DirectoryAttributesGroups',
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

exports.getDirectoryAttributesGroups = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting DirectoryAttributesGroups for Id ${id}`);

  try {
    const directoryAttributesGroups = await DirectoryAttributesGroups.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got DirectoryAttributesGroups Id=${id}`,
      Data: { directoryAttributesGroups },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createDirectoryAttributesGroups = async (req, res, next) => {
  console.log('Creating directoryAttributesGroups');

  try {
    const directoryAttributesGroups = await DirectoryAttributesGroups.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created DirectoryAttributesGroups',
      data: { directoryAttributesGroups },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateDirectoryAttributesGroups = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating DirectoryAttributesGroups Id ${id}`);

  try {
    const directoryAttributesGroups = await DirectoryAttributesGroups.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated DirectoryAttributesGroups Id=${id}`,
      data: { directoryAttributesGroups },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteDirectoryAttributesGroups = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DirectoryAttributesGroups Id ${id}`);

  try {
    const directoryAttributesGroups = await DirectoryAttributesGroups.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted DirectoryAttributesGroups Id=${id}`,
      data: { directoryAttributesGroups },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};