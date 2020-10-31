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

exports.getAllProjectActivity = catchAsync(async (req, res, next) => {
  console.log('Getting All projectActivity');

  
    const projectActivitys = await ProjectActivity.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectActivity',
      results: projectActivitys.length,
      data: {
        projectActivitys,
      },
    });


  next();
});

exports.getProjectActivity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectActivityfor Id ${id}`);

  
    const projectActivity = await ProjectActivity.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectActivityId=${id}`,
      Data: { projectActivity },
    });


  next();
});

exports.createProjectActivity = catchAsync(async (req, res, next) => {
  console.log('Creating projectActivity');

  
    const projectActivity = await ProjectActivity.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectActivity',
      data: { projectActivity },
    });


  next();
});

exports.updateProjectActivity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectActivityId ${id}`);

  
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


  next();
});

exports.deleteProjectActivity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectActivityId ${id}`);

  
    const projectActivity = await ProjectActivity.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectActivityId=${id}`,
      data: { projectActivity },
    });


  next();
});
