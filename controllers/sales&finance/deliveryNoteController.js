/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const DeliveryNote = require('./../../models/sales & finance/deliveryNoteModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDeliveryNote = async (req, res, next) => {
  console.log('Getting All Delivery Note');

  try {
    const deliveryNotes = await DeliveryNote.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All DeliveryNote',
      results: deliveryNotes.length,
      data: {
        deliveryNotes,
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

exports.getDeliveryNote = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Delivery Note for Id ${id}`);

  try {
    const deliveryNote = await DeliveryNote.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Delivery Note Id=${id}`,
      Data: { deliveryNote },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createDeliveryNote = async (req, res, next) => {
  console.log('Creating Delivery Note');

  try {
    const deliveryNote = await DeliveryNote.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created DeliveryNote',
      data: { deliveryNote },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateDeliveryNote = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating DeliveryNote Id ${id}`);

  try {
    const deliveryNote = await DeliveryNote.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Delivery Note Id=${id}`,
      data: { deliveryNote },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteDeliveryNote = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DeliveryNote Id ${id}`);

  try {
    const deliveryNote = await DeliveryNote.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted DeliveryNote Id=${id}`,
      data: { deliveryNote },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
