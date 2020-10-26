/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const ContractEntries = require('../../models/contractEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllContractEntries = async (req, res, next) => {
  console.log('Getting All ContractEntries');

  try {
    const contractEntries = await ContractEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All ContractEntries',
      results: contractEntries.length,
      data: {
        contractEntries,
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

exports.getContractEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting ContractEntries for Id ${id}`);

  try {
    const contractEntries = await ContractEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got ContractEntries Id=${id}`,
      Data: { contractEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createContractEntries = async (req, res, next) => {
  console.log('Creating ContractEntries');

  try {
    const contractEntries = await ContractEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created ContractEntries',
      data: { contractEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateContractEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating ContractEntries Id ${id}`);

  try {
    const contractEntries = await ContractEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated ContractEntries Id=${id}`,
      data: { contractEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteContractEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting ContractEntries Id ${id}`);

  try {
    const contractEntries = await ContractEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted ContractEntries Id=${id}`,
      data: { contractEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
