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
    results: contractTemplates.length,
    data: {
      contractTemplates,
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
  const { body } = req;

  // parse through models
  const doc = new ContractTemplates(req.body);
  console.log(doc);

  //additionalAttributesIds
  if (doc.additionalAttributesIds) {
    const additionalAttributesIdsLength = doc.additionalAttributesIds.length;
    console.log(`additionalAttributesIds length ${additionalAttributesIdsLength}`);

    for (let i = 0; i < additionalAttributesIdsLength; i++) {
      doc.additionalAttributesIds[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.additionalAttributesIds[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.additionalAttributesIds[i].createdAt = Date.now();
      doc.additionalAttributesIds[i].updatedAt = Date.now();
    }
  }

  //terms
  if (doc.terms) {
    const termsLength = doc.terms.length;
    console.log(`terms length ${termsLength}`);

    for (let i = 0; i < termsLength; i++) {
      doc.terms[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.terms[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.terms[i].createdAt = Date.now();
      doc.terms[i].updatedAt = Date.now();
    }
  }


  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);

  //const example = await doc.save({ validateBeforeSave: false });

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
  const { body } = req;
  console.log(`Updating ContractTemplates Id ${id}`);

  // parse through models
  const ContractTemplatesToUpdate = new ContractTemplates(body);
  console.log(body);
  const doc = ContractTemplatesToUpdate.toObject();
  delete doc._id;



  if (ContractTemplatesToUpdate.additionalAttributesIds) {
    const additionalAttributesIdsLength = doc.additionalAttributesIds.length;
    console.log(`Array of objects length ${additionalAttributesIdsLength}`);

    for (let i = 0; i < additionalAttributesIdsLength; i++) {
      doc.additionalAttributesIds[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.additionalAttributesIds[i].updatedAt = Date.now();
    }
  }

  if (ContractTemplatesToUpdate.terms) {
    const termsLength = doc.terms.length;
    console.log(`Array of objects length ${termsLength}`);

    for (let i = 0; i < termsLength; i++) {
      doc.terms[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.terms[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

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
