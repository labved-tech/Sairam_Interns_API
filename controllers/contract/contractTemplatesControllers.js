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
exports.getAllTableContractTemplates = catchAsync(async (req, res, next) => {
  let query;
  // BUILD QUERY
  // 1A) Filtering
  const queryObj = { ...req.query };
  console.log('Raw :', queryObj);

  const excludedFields = [
    'pagination',
    'selectedAllRows',
    'requestIds',
    'sort',
    'fields',
  ];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 1B) Advanced Filtering
  let searchObj;
  if (queryObj.query.generalSearch) {
    const searchStr = queryObj.query.generalSearch;
    searchObj = { $text: { $search: `${searchStr}` } };
    console.log(searchObj);
  }

  let queryStr = JSON.stringify(queryObj.query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log(queryStr);
  const tempObj = JSON.parse(queryStr);
  console.log('Obj :', tempObj);

  query = ContractTemplates.find(searchObj);

  // 2) Sorting
  let sortBy;
  if (req.query.sort) {
    sortBy = `{ "${req.query.sort.field}": "${req.query.sort.sort}" }`;
    query = query.sort(JSON.parse(sortBy));
  } else {
    sortBy = `-createdAt`; //{createdAt : desc}
    query = query.sort(sortBy);
  }

  // 3) Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // 4) Pagination
  const page = req.query.pagination.page * 1 || 1;
  const limit = req.query.pagination.perpage * 1 || 30;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  let numRecords;
  let pages;
  if (req.query.pagination) {
    numRecords = await ContractTemplates.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const contractTemplates = await query;
  //contractTemplates = await ContractTemplates.find();
  //console.log(contractTemplates);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Contract Templates ',
    contractTemplates,
    meta: {
      page: page, // current page
      pages: pages, // total pages
      perpage: limit, // per page items
      total: numRecords, // total records
      field: 'createdAt', // default field sort
      sort: 'desc', // asc or desc
      rowIds: '',
    },
  });
});

exports.getAllContractTemplates = catchAsync(async (req, res, next) => {
  console.log('Getting All ContractTemplates');

  const contractTemplates = await ContractTemplates.find().then();

  res.status(200).json({
    status: 'success',
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
    status: 'success',
    message: `Got ContractTemplates Id=${id}`,
    Data: { contractTemplates },
  });

  next();
});

exports.createContractTemplates = catchAsync(async (req, res, next) => {
  console.log('Creating ContractTemplates');
  const { body } = req;

  // parse through models
  const doc = new ContractTemplates(body);
  console.log(doc);

  //additionalAttributesIds
  if (doc.additionalAttributesIds) {
    const additionalAttributesIdsLength = doc.additionalAttributesIds.length;
    console.log(
      `additionalAttributesIds length ${additionalAttributesIdsLength}`
    );

    for (let i = 0; i < additionalAttributesIdsLength; i++) {
      doc.additionalAttributesIds[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.additionalAttributesIds[i].createdAt = Date.now();
    }
  }

  //terms
  if (doc.terms) {
    const termsLength = doc.terms.length;
    console.log(`terms length ${termsLength}`);

    for (let j = 0; j < termsLength; j++) {
      doc.terms[j].createdBy = '5f990bb3c727e952a076f3b7';
      doc.terms[j].createdAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(`After Validation :${doc}`);

  //const example = await doc.save({ validateBeforeSave: false });

  const contractTemplates = await ContractTemplates.create(doc).then();

  res.status(201).json({
    status: 'success',
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

    for (let j = 0; j < termsLength; j++) {
      doc.terms[j].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.terms[j].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const contractTemplates = await ContractTemplates.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated ContractTemplates Id=${id}`,
    data: { contractTemplates },
  });

  next();
});

exports.deleteContractTemplates = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting ContractTemplates Id ${id}`);

  const contractTemplates = await ContractTemplates.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted ContractTemplates Id=${id}`,
    data: { contractTemplates },
  });

  next();
});
