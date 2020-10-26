/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Ticketproducts = require('../../models/ticket-support/ticketproductsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTicketProducts = async (req, res, next) => {
  console.log('Getting All Ticketproducts');

  try {
    const ticketproducts = await Ticketproducts.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Ticketproducts',
      results: ticketproducts.length,
      data: {
        ticketproducts,
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

exports.getTicketProducts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Ticketproducts for Id ${id}`);

  try {
    const ticketproducts = await Ticketproducts.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Ticketproducts Id=${id}`,
      Data: { ticketproducts },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createTicketProducts = async (req, res, next) => {
  console.log('Creating Ticketproducts');

  try {
    const ticketproducts = await Ticketproducts.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Ticketproducts',
      data: { ticketproducts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateTicketProducts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Ticketproducts Id ${id}`);

  try {
    const ticketproducts = await Ticketproducts.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Ticketproducts Id=${id}`,
      data: { ticketproducts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteTicketProducts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Ticketproducts Id ${id}`);

  try {
    const ticketproducts = await Ticketproducts.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted Ticketproducts Id=${id}`,
      data: { ticketproducts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
