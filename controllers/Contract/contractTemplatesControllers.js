/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const ContractTemplates = require('../../models/ContractTemplatesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllContractTemplates = async (req, res, next) => {
  console.log('Getting All ContractTemplates');

  try {
    const ContractTemplates = await ContractTemplates.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All ContractTemplates',
      results: ContractTemplates.length,
      data: {
        ContractTemplates,
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

exports.getContractTemplates = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting ContractTemplates for Id ${id}`);

  try {
    const ContractTemplates = await ContractTemplates.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got ContractTemplates Id=${id}`,
      Data: { ContractTemplates },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createContractTemplates = async (req, res, next) => {
  console.log('Creating ContractTemplates');

  try {
    const ContractTemplates = await ContractTemplates.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created ContractTemplates',
      data: { ContractTemplates },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateContractTemplates = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating ContractTemplates Id ${id}`);

  try {
    const ContractTemplates = await ContractTemplates.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated ContractTemplates Id=${id}`,
      data: { ContractTemplates },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteContractTemplates = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting ContractTemplates Id ${id}`);

  try {
    const ContractTemplates = await ContractTemplates.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted ContractTemplates Id=${id}`,
      data: { ContractTemplates },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
