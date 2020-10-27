/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const ProjectFiles = require('../../models/project-management/projectFilesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectFiles = async (req, res, next) => {
  console.log('Getting All projectFiles');

  try {
    const projectFiles = await ProjectFiles.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectFiles',
      results: projectFiles.length,
      data: {
        projectFiles,
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

exports.getProjectFiles = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectFiles for Id ${id}`);

  try {
    const projectFiles = await ProjectFiles.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectFiles Id=${id}`,
      Data: { projectFiles },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createProjectFiles = async (req, res, next) => {
  console.log('Creating projectFiles');

  try {
    const projectFiles = await ProjectFiles.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectFiles',
      data: { projectFiles },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateProjectFiles = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectFiles Id ${id}`);

  try {
    const projectFiles = await ProjectFiles.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectFiles Id=${id}`,
      data: { projectFiles },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteProjectFiles = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectFiles Id ${id}`);

  try {
    const projectFiles = await ProjectFiles.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectFiles Id=${id}`,
      data: { projectFiles },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
