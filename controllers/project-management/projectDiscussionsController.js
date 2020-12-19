/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectDiscussions = require('../../models/project-management/projectDiscussionsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectDiscussions = catchAsync(async (req, res, next) => {
  console.log('Getting All Project Discussions');

  const projectDiscussions = await ProjectDiscussions.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Project Discussions',
    results: projectDiscussions.length,
    data: {
      projectDiscussions,
    },
  });

  next();
});

exports.getProjectDiscussions = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectDiscussions for Id ${id}`);

  const projectDiscussions = await ProjectDiscussions.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got projectDiscussions Id=${id}`,
    data: { projectDiscussions },
  });

  next();
});

exports.createProjectDiscussions = catchAsync(async (req, res, next) => {
  console.log('Creating Project Discussions');
  const { body } = req;

  // parse through models
  const doc = new ProjectDiscussions(body);
  console.log(doc);

  // validate seperately sub-documents if necessary

  // replace doc if necessary

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const projectDiscussions = await ProjectDiscussions.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Project Discussions',
    data: { projectDiscussions },
  });

  next();
});

exports.updateProjectDiscussions = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating ProjectDiscussions Id ${id}`);

  // parse through models
  const ProjectDiscussionsToUpdate = new ProjectDiscussions(body);
  console.log(body);
  const doc = ProjectDiscussionsToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const projectDiscussions = await ProjectDiscussions.findByIdAndUpdate(
    id,
    doc,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated projectDiscussions Id=${id}`,
    data: { projectDiscussions },
  });

  next();
});

exports.deleteProjectDiscussions = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectDiscussions Id ${id}`);

  const projectDiscussions = await ProjectDiscussions.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted projectDiscussions Id=${id}`,
    data: { projectDiscussions },
  });

  next();
});
