/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const EventEntries = require('./../../models/events/eventEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEventEntries = async (req, res, next) => {
  console.log('Getting All EventEntries');

  try {
    const eventEntries = await EventEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All EventEntries',
      results: eventEntries.length,
      data: {
        eventEntries,
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

exports.getEventEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EventEntries for Id ${id}`);

  try {
    const eventEntries = await EventEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got EventEntries Id=${id}`,
      Data: { eventEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createEventEntries = async (req, res, next) => {
  console.log('Creating EventEntries');

  try {
    const eventEntries = await EventEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created EventEntries',
      data: { eventEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateEventEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EventEntries Id ${id}`);

  try {
    const eventEntries = await EventEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated EventEntries Id=${id}`,
      data: { eventEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteEventEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EventEntries Id ${id}`);

  try {
    const eventEntries = await EventEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted EventEntries Id=${id}`,
      data: { eventEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
