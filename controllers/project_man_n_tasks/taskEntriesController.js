/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TaskEntries = require('./../../models/project_man_n_tasks/taskEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskEntries = async (req, res, next) => {
  console.log('Getting All taskEntries');

  try {
    const taskEntries = await TaskEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskEntries',
      results: taskEntries.length,
      data: {
        taskEntries,
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

exports.getTaskEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskEntries for Id ${id}`);

  try {
    const taskEntries = await TaskEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskEntries Id=${id}`,
      Data: { taskEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTaskEntries = async (req, res, next) => {
  console.log('Creating taskEntries');

  try {
    const taskEntries = await TaskEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskEntries',
      data: { taskEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTaskEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskEntries Id ${id}`);

  try {
    const taskEntries = await TaskEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskEntries Id=${id}`,
      data: { taskEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTaskEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskEntries Id ${id}`);

  try {
    const taskEntries = await TaskEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskEntries Id=${id}`,
      data: { taskEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
