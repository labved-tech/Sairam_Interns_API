/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Milestone = require(`./../../models/project-management/milestoneModel`);

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllMilestone = catchAsync(async (req, res, next) => {
  console.log('Getting All milestone');

  
    const milestones = await Milestone.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All milestone',
      results: milestones.length,
      data: {
        milestones,
      },
    });


  next();
});

exports.getMilestone = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting milestone for Id ${id}`);

  
    const milestone = await Milestone.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got milestone Id=${id}`,
      Data: { milestone },
    });


  next();
});

exports.createMilestone = catchAsync(async (req, res, next) => {
  console.log('Creating milestone');

  
    const milestone = await Milestone.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created milestone',
      data: { milestone },
    });


  next();
});

exports.updateMilestone = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating milestone Id ${id}`);

  
    const milestone = await Milestone.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated milestone Id=${id}`,
      data: { milestone },
    });


  next();
});

exports.deleteMilestone = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting milestone Id ${id}`);

  
    const milestone = await Milestone.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted milestone Id=${id}`,
      data: { milestone },
    });


  next();
});
