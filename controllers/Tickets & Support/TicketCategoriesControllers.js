/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TicketCategories = require('../../models/ticketCategoriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTicketCategories = async (req, res, next) => {
  console.log('Getting All TicketCategories');

  try {
    const ticketCategories = await TicketCategories.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All TicketCategories',
      results: ticketCategories.length,
      data: {
        ticketCategories,
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

exports.getTicketCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting TicketCategories for Id ${id}`);

  try {
    const ticketCategories = await TicketCategories.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got TicketCategories Id=${id}`,
      Data: { ticketCategories },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTicketCategories = async (req, res, next) => {
  console.log('Creating TicketCategories');

  try {
    const ticketCategories = await TicketCategories.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created TicketCategories',
      data: { ticketCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTicketCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating TicketCategories Id ${id}`);

  try {
    const ticketCategories = await TicketCategories.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated TicketCategories Id=${id}`,
      data: { ticketCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTicketCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting TicketCategories Id ${id}`);

  try {
    const ticketCategories = await TicketCategories.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted TicketCategories Id=${id}`,
      data: { ticketCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
