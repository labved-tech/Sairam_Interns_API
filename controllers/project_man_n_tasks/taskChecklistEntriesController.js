/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TaskChecklistEntries = require('./../../models/project_man_n_tasks/taskChecklistEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskChecklistEntries = async (req, res, next) => {
  console.log('Getting All taskChecklistEntries');

  try {
    const taskChecklistEntriess = await TaskChecklistEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskChecklistEntries',
      results: taskChecklistEntriess.length,
      data: {
        taskChecklistEntriess,
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

exports.getTaskChecklistEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskChecklistEntries for Id ${id}`);

  try {
    const taskChecklistEntries = await TaskChecklistEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskChecklistEntries Id=${id}`,
      Data: { taskChecklistEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTaskChecklistEntries = async (req, res, next) => {
  console.log('Creating taskChecklistEntries');

  try {
    const taskChecklistEntries = await TaskChecklistEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskChecklistEntries',
      data: { taskChecklistEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTaskChecklistEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskChecklistEntries Id ${id}`);

  try {
    const taskChecklistEntries = await TaskChecklistEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskChecklistEntries Id=${id}`,
      data: { taskChecklistEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTaskChecklistEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskChecklistEntries Id ${id}`);

  try {
    const taskChecklistEntries = await TaskChecklistEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskChecklistEntries Id=${id}`,
      data: { taskChecklistEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
