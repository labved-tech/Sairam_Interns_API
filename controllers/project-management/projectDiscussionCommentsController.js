/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectDiscussionComments = require('../../models/project-management/projectDiscussionCommentsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectDiscussionComments = catchAsync(async (req, res, next) => {
  console.log('Getting All projectDiscussionComments');

  try {
    const projectDiscussionComments = await ProjectDiscussionComments.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectDiscussionComments',
      results: projectDiscussionComments.length,
      data: {
        projectDiscussionComments,
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

exports.getProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectDiscussionComments for Id ${id}`);

  try {
    const projectDiscussionComments = await ProjectDiscussionComments.findById(
      id
    ).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectDiscussionComments Id=${id}`,
      Data: { projectDiscussionComments },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.createProjectDiscussionComments = catchAsync(async (req, res, next) => {
  console.log('Creating projectDiscussionComments');

  try {
    const projectDiscussionComments = await ProjectDiscussionComments.create(
      req.body
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectDiscussionComments',
      data: { projectDiscussionComments },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.updateProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectDiscussionComments Id ${id}`);

  try {
    const projectDiscussionComments = await ProjectDiscussionComments.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectDiscussionComments Id=${id}`,
      data: { projectDiscussionComments },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.deleteProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectDiscussionComments Id ${id}`);

  try {
    const projectDiscussionComments = await ProjectDiscussionComments.findByIdAndDelete(
      id
    ).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectDiscussionComments Id=${id}`,
      data: { projectDiscussionComments },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});
