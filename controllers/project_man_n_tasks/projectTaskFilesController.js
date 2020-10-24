/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const ProjectTaskFiles = require('./../../models/project_man_n_tasks/projectTaskFilesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectTaskFiles = async (req, res, next) => {
  console.log('Getting All projectTaskFiles');

  try {
    const projectTaskFiles = await ProjectTaskFiles.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectTaskFiles',
      results: projectTaskFiles.length,
      data: {
        projectTaskFiles,
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

exports.getProjectTaskFiles = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectTaskFiles for Id ${id}`);

  try {
    const projectTaskFiles = await ProjectTaskFiles.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectTaskFiles Id=${id}`,
      Data: { projectTaskFiles },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createProjectTaskFiles = async (req, res, next) => {
  console.log('Creating projectTaskFiles');

  try {
    const projectTaskFiles = await ProjectTaskFiles.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectTaskFiles',
      data: { projectTaskFiles },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateProjectTaskFiles = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectTaskFiles Id ${id}`);

  try {
    const projectTaskFiles = await ProjectTaskFiles.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectTaskFiles Id=${id}`,
      data: { projectTaskFiles },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteProjectTaskFiles = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectTaskFiles Id ${id}`);

  try {
    const projectTaskFiles = await ProjectTaskFiles.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectTaskFiles Id=${id}`,
      data: { projectTaskFiles },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
