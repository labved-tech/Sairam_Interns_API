/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectActivity = require('../../models/project-management/projectActivityModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectActivity = async (req, res, next) => {
  console.log('Getting All projectActivity');

  try {
    const projectActivitys = await ProjectActivity.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectActivity',
      results: projectActivitys.length,
      data: {
        projectActivitys,
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

exports.getProjectActivity = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectActivityfor Id ${id}`);

  try {
    const projectActivity = await ProjectActivity.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectActivityId=${id}`,
      Data: { projectActivity },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createProjectActivity = async (req, res, next) => {
  console.log('Creating projectActivity');

  try {
    const projectActivity = await ProjectActivity.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectActivity',
      data: { projectActivity },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateProjectActivity = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectActivityId ${id}`);

  try {
    const projectActivity = await ProjectActivity.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectActivityId=${id}`,
      data: { projectActivity },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteProjectActivity = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectActivityId ${id}`);

  try {
    const projectActivity = await ProjectActivity.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectActivityId=${id}`,
      data: { projectActivity },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
