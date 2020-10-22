/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const ProjectDiscussions = require('./../../models/project_man_n_tasks/projectDiscussionsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectDiscussions = async (req, res, next) => {
  console.log('Getting All projectDiscussions');

  try {
    const projectDiscussionss = await ProjectDiscussions.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectDiscussions',
      results: projectDiscussionss.length,
      data: {
        projectDiscussionss,
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

exports.getProjectDiscussions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectDiscussions for Id ${id}`);

  try {
    const projectDiscussions = await ProjectDiscussions.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectDiscussions Id=${id}`,
      Data: { projectDiscussions },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createProjectDiscussions = async (req, res, next) => {
  console.log('Creating projectDiscussions');

  try {
    const projectDiscussions = await ProjectDiscussions.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectDiscussions',
      data: { projectDiscussions },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateProjectDiscussions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectDiscussions Id ${id}`);

  try {
    const projectDiscussions = await ProjectDiscussions.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectDiscussions Id=${id}`,
      data: { projectDiscussions },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteProjectDiscussions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectDiscussions Id ${id}`);

  try {
    const projectDiscussions = await ProjectDiscussions.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectDiscussions Id=${id}`,
      data: { projectDiscussions },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
