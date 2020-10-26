/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TicketEntries = require('../../models/ticketEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTicketEntries = async (req, res, next) => {
  console.log('Getting All TicketEntries');

  try {
    const ticketEntries = await TicketEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All TicketEntries',
      results: ticketEntries.length,
      data: {
        ticketEntries,
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

exports.getTicketEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting TicketEntries for Id ${id}`);

  try {
    const ticketEntries = await TicketEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got TicketEntries Id=${id}`,
      Data: { ticketEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTicketEntries = async (req, res, next) => {
  console.log('Creating TicketEntries');

  try {
    const ticketEntries = await TicketEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created TicketEntries',
      data: { ticketEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTicketEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating TicketEntries Id ${id}`);

  try {
    const ticketEntries = await TicketEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated TicketEntries Id=${id}`,
      data: { ticketEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTicketEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting TicketEntries Id ${id}`);

  try {
    const ticketEntries = await TicketEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted TicketEntries Id=${id}`,
      data: { ticketEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
