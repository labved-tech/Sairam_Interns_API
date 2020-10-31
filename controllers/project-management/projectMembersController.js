/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectMembers = require('../../models/project-management/projectMembersModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectMembers = catchAsync(async (req, res, next) => {
  console.log('Getting All projectMembers');

  
    const projectMembers = await ProjectMembers.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectMembers',
      results: projectMembers.length,
      data: {
        projectMembers,
      },
    });


  next();
});

exports.getProjectMembers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectMembers for Id ${id}`);

  
    const projectMembers = await ProjectMembers.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectMembers Id=${id}`,
      Data: { projectMembers },
    });


  next();
});

exports.createProjectMembers = catchAsync(async (req, res, next) => {
  console.log('Creating projectMembers');

  
    const projectMembers = await ProjectMembers.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectMembers',
      data: { projectMembers },
    });


  next();
});

exports.updateProjectMembers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectMembers Id ${id}`);

  
    const projectMembers = await ProjectMembers.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectMembers Id=${id}`,
      data: { projectMembers },
    });


  next();
});

exports.deleteProjectMembers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectMembers Id ${id}`);

  
    const projectMembers = await ProjectMembers.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectMembers Id=${id}`,
      data: { projectMembers },
    });


  next();
});
