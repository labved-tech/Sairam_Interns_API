/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectNotes = require('../../models/project-management/projectNotesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectNotes = catchAsync(async (req, res, next) => {
  console.log('Getting All projectNotes');

  
    const projectNotes = await ProjectNotes.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectNotes',
      results: projectNotes.length,
      data: {
        projectNotes,
      },
    });


  next();
});

exports.getProjectNotes = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectNotes for Id ${id}`);

  
    const projectNotes = await ProjectNotes.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectNotes Id=${id}`,
      Data: { projectNotes },
    });


  next();
});

exports.createProjectNotes = catchAsync(async (req, res, next) => {
  console.log('Creating projectNotes');
    // parse through models
    const doc = new ProjectNotes(req.body);
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
  
    const projectNotes = await ProjectNotes.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectNotes',
      data: { projectNotes },
    });


  next();
});

exports.updateProjectNotes = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating ProjectNotes Id ${id}`);


  // parse through models
  const ProjectNotesToUpdate = new ProjectNotes(body);
  console.log(body);
  const doc = ProjectNotesToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  
    const projectNotes = await ProjectNotes.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectNotes Id=${id}`,
      data: { projectNotes },
    });


  next();
});

exports.deleteProjectNotes = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectNotes Id ${id}`);

  
    const projectNotes = await ProjectNotes.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectNotes Id=${id}`,
      data: { projectNotes },
    });


  next();
});
