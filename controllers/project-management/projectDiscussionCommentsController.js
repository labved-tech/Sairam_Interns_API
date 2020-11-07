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

  
    const projectDiscussionComments = await ProjectDiscussionComments.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectDiscussionComments',
      results: projectDiscussionComments.length,
      data: {
        projectDiscussionComments,
      },
    });


  next();
});

exports.getProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectDiscussionComments for Id ${id}`);

  
    const projectDiscussionComments = await ProjectDiscussionComments.findById(
      id
    ).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectDiscussionComments Id=${id}`,
      Data: { projectDiscussionComments },
    });


  next();
});

exports.createProjectDiscussionComments = catchAsync(async (req, res, next) => {
  console.log('Creating projectDiscussionComments');
  const { body } = req;

    // parse through models
    const doc = new ProjectDiscussionComments(body);
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
  
    const projectDiscussionComments = await ProjectDiscussionComments.create(
      doc
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectDiscussionComments',
      data: { projectDiscussionComments },
    });


  next();
});

exports.updateProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating ProjectDiscussionComments Id ${id}`);


  // parse through models
  const ProjectDiscussionCommentsToUpdate = new ProjectDiscussionComments(body);
  console.log(body);
  const doc = ProjectDiscussionCommentsToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  
    const projectDiscussionComments = await ProjectDiscussionComments.findByIdAndUpdate(
      id, doc,
      {
        new: true,
      }
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectDiscussionComments Id=${id}`,
      data: { projectDiscussionComments },
    });


  next();
});

exports.deleteProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectDiscussionComments Id ${id}`);

  
    const projectDiscussionComments = await ProjectDiscussionComments.findByIdAndDelete(
      id
    ).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectDiscussionComments Id=${id}`,
      data: { projectDiscussionComments },
    });


  next();
});
