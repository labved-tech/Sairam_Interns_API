/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TaskChecklistStatus = require('./../../models/project_man_n_tasks/taskChecklistStatusModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskChecklistStatus = async (req, res, next) => {
  console.log('Getting All taskChecklistStatus');

  try {
    const taskChecklistStatuss = await TaskChecklistStatus.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskChecklistStatus',
      results: taskChecklistStatuss.length,
      data: {
        taskChecklistStatuss,
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

exports.getTaskChecklistStatus = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskChecklistStatus for Id ${id}`);

  try {
    const taskChecklistStatus = await TaskChecklistStatus.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskChecklistStatus Id=${id}`,
      Data: { taskChecklistStatus },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTaskChecklistStatus = async (req, res, next) => {
  console.log('Creating taskChecklistStatus');

  try {
    const taskChecklistStatus = await TaskChecklistStatus.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskChecklistStatus',
      data: { taskChecklistStatus },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTaskChecklistStatus = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskChecklistStatus Id ${id}`);

  try {
    const taskChecklistStatus = await TaskChecklistStatus.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskChecklistStatus Id=${id}`,
      data: { taskChecklistStatus },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTaskChecklistStatus = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskChecklistStatus Id ${id}`);

  try {
    const taskChecklistStatus = await TaskChecklistStatus.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskChecklistStatus Id=${id}`,
      data: { taskChecklistStatus },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
