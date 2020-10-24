/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const EcommerceAddress = require('../../models/ecommerce/ecommerceAddressModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceAddress = async (req, res, next) => {
  console.log('Getting All ecommerceAddress');

  try {
    const ecommerceAddresss = await EcommerceAddress.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All ecommerceAddress',
      results: ecommerceAddresss.length,
      data: {
        ecommerceAddresss,
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

exports.getEcommerceAddress = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting ecommerceAddress for Id ${id}`);

  try {
    const ecommerceAddress = await EcommerceAddress.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got ecommerceAddress Id=${id}`,
      Data: { ecommerceAddress },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createEcommerceAddress = async (req, res, next) => {
  console.log('Creating ecommerceAddress');

  try {
    const ecommerceAddress = await EcommerceAddress.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created ecommerceAddress',
      data: { ecommerceAddress },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateEcommerceAddress = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating ecommerceAddress Id ${id}`);

  try {
    const ecommerceAddress = await EcommerceAddress.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated ecommerceAddress Id=${id}`,
      data: { ecommerceAddress },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteEcommerceAddress = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting ecommerceAddress Id ${id}`);

  try {
    const ecommerceAddress = await EcommerceAddress.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted ecommerceAddress Id=${id}`,
      data: { ecommerceAddress },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
