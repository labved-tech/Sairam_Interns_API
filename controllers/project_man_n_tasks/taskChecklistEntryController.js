/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TaskChecklistEntry = require('./../../models/project_man_n_tasks/taskChecklistEntryModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskChecklistEntry = async (req, res, next) => {
  console.log('Getting All taskChecklistEntry');

  try {
    const taskChecklistEntrys = await TaskChecklistEntry.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskChecklistEntry',
      results: taskChecklistEntrys.length,
      data: {
        taskChecklistEntrys,
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

exports.getTaskChecklistEntry = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskChecklistEntry for Id ${id}`);

  try {
    const taskChecklistEntry = await TaskChecklistEntry.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskChecklistEntry Id=${id}`,
      Data: { taskChecklistEntry },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTaskChecklistEntry = async (req, res, next) => {
  console.log('Creating taskChecklistEntry');

  try {
    const taskChecklistEntry = await TaskChecklistEntry.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskChecklistEntry',
      data: { taskChecklistEntry },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTaskChecklistEntry = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskChecklistEntry Id ${id}`);

  try {
    const taskChecklistEntry = await TaskChecklistEntry.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskChecklistEntry Id=${id}`,
      data: { taskChecklistEntry },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTaskChecklistEntry = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskChecklistEntry Id ${id}`);

  try {
    const taskChecklistEntry = await TaskChecklistEntry.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskChecklistEntry Id=${id}`,
      data: { taskChecklistEntry },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
