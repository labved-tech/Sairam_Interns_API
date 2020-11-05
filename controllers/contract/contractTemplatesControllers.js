/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ContractTemplates = require('../../models/contract/contractTemplatesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllContractTemplates = catchAsync(async (req, res, next) => {
  console.log('Getting All ContractTemplates');

  const contractTemplates = await ContractTemplates.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All ContractTemplates',
      results: ContractTemplates.length,
      data: {
        ContractTemplates,
      },
    });
  
  next();
});

exports.getContractTemplates = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting ContractTemplates for Id ${id}`);
  
  const contractTemplates = await ContractTemplates.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got ContractTemplates Id=${id}`,
      Data: { contractTemplates },
    });
 
  next();
});

exports.createContractTemplates = catchAsync(async (req, res, next) => {
  console.log('Creating ContractTemplates');

  // parse through models
  const doc = new ContractTemplates(req.body);
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
  const contractTemplates = await ContractTemplates.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created ContractTemplates',
      data: { contractTemplates },
    });

  next();
});

exports.updateContractTemplates = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating ContractTemplates Id ${id}`);

  const contractTemplates = await ContractTemplates.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated ContractTemplates Id=${id}`,
    data: { contractTemplates },
  });

  next();
});

exports.deleteContractTemplates = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting ContractTemplates Id ${id}`);

  const contractTemplates = await ContractTemplates.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted ContractTemplates Id=${id}`,
      data: { contractTemplates },
    });
  
  next();
});
