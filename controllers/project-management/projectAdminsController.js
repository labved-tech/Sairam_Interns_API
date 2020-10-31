/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectAdmins = require('../../models/project-management/projectAdminsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectAdmins = catchAsync(async (req, res, next) => {
  console.log('Getting All projectAdmins');

  try {
    const projectAdmins = await ProjectAdmins.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectAdmins',
      results: projectAdmins.length,
      data: {
        projectAdmins,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.getProjectAdmins = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectAdmins for Id ${id}`);

  try {
    const projectAdmins = await ProjectAdmins.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectAdmins Id=${id}`,
      Data: { projectAdmins },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.createProjectAdmins = catchAsync(async (req, res, next) => {
  console.log('Creating projectAdmins');

  try {
    const projectAdmins = await ProjectAdmins.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectAdmins',
      data: { projectAdmins },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.updateProjectAdmins = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectAdmins Id ${id}`);

  try {
    const projectAdmins = await ProjectAdmins.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectAdmins Id=${id}`,
      data: { projectAdmins },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.deleteProjectAdmins = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectAdmins Id ${id}`);

  try {
    const projectAdmins = await ProjectAdmins.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectAdmins Id=${id}`,
      data: { projectAdmins },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});
