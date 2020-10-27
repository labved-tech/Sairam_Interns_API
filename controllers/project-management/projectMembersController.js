/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const ProjectMembers = require('../../models/project-management/projectMembersModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectMembers = async (req, res, next) => {
  console.log('Getting All projectMembers');

  try {
    const projectMembers = await ProjectMembers.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectMembers',
      results: projectMembers.length,
      data: {
        projectMembers,
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

exports.getProjectMembers = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectMembers for Id ${id}`);

  try {
    const projectMembers = await ProjectMembers.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectMembers Id=${id}`,
      Data: { projectMembers },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createProjectMembers = async (req, res, next) => {
  console.log('Creating projectMembers');

  try {
    const projectMembers = await ProjectMembers.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectMembers',
      data: { projectMembers },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateProjectMembers = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectMembers Id ${id}`);

  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteProjectMembers = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectMembers Id ${id}`);

  try {
    const projectMembers = await ProjectMembers.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectMembers Id=${id}`,
      data: { projectMembers },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
