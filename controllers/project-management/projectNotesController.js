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

exports.getAllProjectNotes = async (req, res, next) => {
  console.log('Getting All projectNotes');

  try {
    const projectNotes = await ProjectNotes.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectNotes',
      results: projectNotes.length,
      data: {
        projectNotes,
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

exports.getProjectNotes = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectNotes for Id ${id}`);

  try {
    const projectNotes = await ProjectNotes.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectNotes Id=${id}`,
      Data: { projectNotes },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createProjectNotes = async (req, res, next) => {
  console.log('Creating projectNotes');

  try {
    const projectNotes = await ProjectNotes.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectNotes',
      data: { projectNotes },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateProjectNotes = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectNotes Id ${id}`);

  try {
    const projectNotes = await ProjectNotes.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectNotes Id=${id}`,
      data: { projectNotes },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteProjectNotes = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectNotes Id ${id}`);

  try {
    const projectNotes = await ProjectNotes.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectNotes Id=${id}`,
      data: { projectNotes },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
