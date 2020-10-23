/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Address = require('./../../models/sales & finance/addressModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllAddress = async (req, res, next) => {
  console.log('Getting All Address');

  try {
    const address = await Address.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Address',
      results: address.length,
      data: {
       address,
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

exports.getAddress = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Address for Id ${id}`);

  try {
    const address = await Address.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `GotAddress Id=${id}`,
      Data: {address },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createAddress = async (req, res, next) => {
  console.log('Creating Address');

  try {
    const address = await Address.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Address',
      data: {address },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateAddress = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Address Id ${id}`);

  try {
    const address = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Address Id=${id}`,
      data: {address },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteAddress = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Address Id ${id}`);

  try {
    const address = await Address.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted Address Id=${id}`,
      data: {address },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
