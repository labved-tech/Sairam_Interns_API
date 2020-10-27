/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TaskReminders = require('./../../models/project-management/taskRemindersModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskReminders = async (req, res, next) => {
  console.log('Getting All taskReminders');

  try {
    const taskReminders = await TaskReminders.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskReminders',
      results: taskReminders.length,
      data: {
        taskReminders,
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

exports.getTaskReminders = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskReminders for Id ${id}`);

  try {
    const taskReminders = await TaskReminders.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskReminders Id=${id}`,
      Data: { taskReminders },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTaskReminders = async (req, res, next) => {
  console.log('Creating taskReminders');

  try {
    const taskReminders = await TaskReminders.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskReminders',
      data: { taskReminders },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTaskReminders = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskReminders Id ${id}`);

  try {
    const taskReminders = await TaskReminders.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskReminders Id=${id}`,
      data: { taskReminders },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTaskReminders = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskReminders Id ${id}`);

  try {
    const taskReminders = await TaskReminders.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskReminders Id=${id}`,
      data: { taskReminders },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
