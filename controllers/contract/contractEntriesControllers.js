/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ContractEntries = require('../../models/contract/contractEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllContractEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All ContractEntries');

  const contractEntries = await ContractEntries.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All ContractEntries',
    results: contractEntries.length,
    data: {
      contractEntries,
    },
  });

  next();
});

exports.getContractEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting ContractEntries for Id ${id}`);

  const contractEntries = await ContractEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got ContractEntries Id=${id}`,
      Data: { contractEntries },
    });
  
  next();
});

exports.createContractEntries = catchAsync(async (req, res, next) => {
  console.log('Creating ContractEntries');

  // parse through models
  const doc = new ContractEntries(req.body);
  console.log(doc);

  // validate seperately sub-documents if necessary

  // replace doc if necessary

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const contractEntries = await ContractEntries.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created ContractEntries',
      data: { contractEntries },
    });
    
  next();
});

exports.updateContractEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating ContractEntries Id ${id}`);

  const contractEntries = await ContractEntries.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated ContractEntries Id=${id}`,
    data: { contractEntries },
  });

  next();
});

exports.deleteContractEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting ContractEntries Id ${id}`);

  const contractEntries = await ContractEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted ContractEntries Id=${id}`,
      data: { contractEntries },
    });

  next();
});
