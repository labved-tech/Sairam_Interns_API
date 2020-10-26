/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TicketResponse = require('../../models/ticket-support/ticketResponseModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTicketResponse = async (req, res, next) => {
  console.log('Getting All TicketResponse');

  try {
    const ticketResponse = await TicketResponse.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All TicketResponse',
      results: ticketResponse.length,
      data: {
        ticketResponse,
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

exports.getTicketResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting TicketResponse for Id ${id}`);

  try {
    const ticketResponse = await TicketResponse.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got TicketResponse Id=${id}`,
      Data: { ticketResponse },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTicketResponse = async (req, res, next) => {
  console.log('Creating TicketResponse');

  try {
    const ticketResponse = await TicketResponse.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created TicketResponse',
      data: { ticketResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTicketResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating TicketResponse Id ${id}`);

  try {
    const ticketResponse = await TicketResponse.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated TicketResponse Id=${id}`,
      data: { ticketResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTicketResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting TicketResponse Id ${id}`);

  try {
    const ticketResponse = await TicketResponse.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted TicketResponse Id=${id}`,
      data: { ticketResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
