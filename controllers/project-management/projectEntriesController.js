/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const ProjectEntries = require('../../models/project-management/projectEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectEntries = async (req, res, next) => {
  console.log('Getting All projectEntries');

  try {
    const projectEntries = await ProjectEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectEntries',
      results: projectEntries.length,
      data: {
        projectEntries,
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

exports.getProjectEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectEntries for Id ${id}`);

  try {
    const projectEntries = await ProjectEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectEntries Id=${id}`,
      Data: { projectEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createProjectEntries = async (req, res, next) => {
  console.log('Creating projectEntries');

  try {
    const projectEntries = await ProjectEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectEntries',
      data: { projectEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateProjectEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectEntries Id ${id}`);

  try {
    const projectEntries = await ProjectEntries.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectEntries Id=${id}`,
      data: { projectEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteProjectEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectEntries Id ${id}`);

  try {
    const projectEntries = await ProjectEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectEntries Id=${id}`,
      data: { projectEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
