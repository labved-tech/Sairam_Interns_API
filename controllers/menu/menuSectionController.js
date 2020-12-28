/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const MenuSection = require('../../models/menu/menuSectionModel');
const MenuManager = require('../../models/menu/menuManagerModel');

/* DATABASE */

/* CONTROLLERS */
exports.getAllTableMenuSection = catchAsync(async (req, res, next) => {
  let query;
  // BUILD QUERY
  // 1A) Filtering
  const queryObj = { ...req.query };
  // console.log('queryRaw :', queryObj);

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
  //console.log(queryStr);
  const tempObj = JSON.parse(queryStr);
  //console.log('Obj :', tempObj);

  query = MenuSection.find(searchObj);

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
    numRecords = await MenuSection.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    // if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const menuSection = await query;
  //menuSection = await Example.find();
  console.log(menuSection);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Example',
    menuSection,
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

exports.getAllMenuSection = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu Sections');

  const menuSection = await MenuSection.find()
    .populate('_item')
    .sort('priority')
    .then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Menu Section',
    results: menuSection.length,
    menuSection,
  });
  next();
});

exports.getMenuSection = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Menu Sections with Id ${id}`);

  const menuSection = await MenuSection.findById(id).then();
  const menuManager = await MenuManager.findOne({
    _section: id,
  }).then();

  res.status(200).json({
    status: 'success',
    message: `Got Menu Section Id=${id}`,
    menuSection,
    menuManager,
  });

  next();
});

exports.createMenuSection = catchAsync(async (req, res, next) => {
  console.log('Creating Menu Sections');
  const { body } = req;
  console.log('rawBody :', body);

  // parse through models
  const doc = new MenuSection(body);

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  // console.log(doc);

  // creating document
  const menuSection = await MenuSection.create(doc).then();

  // updating foreign key document
  let menuManager = await MenuManager.findById(body.manager);
  menuManager._section.push(menuSection._id);
  await menuManager.save();
  menuManager = await MenuManager.findById(body.manager);

  res.status(201).json({
    status: 'success',
    message: 'Created Menu Section',
    menuSection,
    menuManager,
  });
});

exports.updateMenuSection = catchAsync(async (req, res, next) => {
  const { body } = req;
  console.log('rawBody :', body);
  const { id } = req.params;
  console.log(`Updating Menu Section Id ${id}`);

  // parse through models
  const doc = new MenuSection(body);
  const priority = req.body.priority * 1;
  doc.priority = priority;

  doc._id = id; // delete id

  const menuSection = await MenuSection.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  // remove all entries with section id
  const ids = [];
  ids.push(id);

  let menuManager;

  menuManager = await MenuManager.updateMany(
    { _section: ids[0] },
    { $pullAll: { _section: ids } }
  ).then();

  // updating foreign key document
  menuManager = await MenuManager.findById(body.manager);
  menuManager._section.push(menuSection._id);
  await menuManager.save();

  res.status(201).json({
    status: 'success',
    message: `Updated Menu Section Id=${id}`,
    menuSection,
    menuManager,
  });
});

exports.deleteMenuSection = catchAsync(async (req, res, next) => {
  const { query } = req;
  console.log('rawQuery :', query);

  console.log(`Deleting Menu Section Id ${query._id}`);

  const ids = query._id.split(',');

  let menuManager;

  // deleting relevant foreign key documents
  if (ids.length === 1) {
    menuManager = await MenuManager.updateMany(
      { _section: ids[0] },
      { $pullAll: { _section: ids } }
    ).then();
  } else {
    menuManager = await MenuManager.updateMany(
      { _section: ids },
      { $pullAll: { _section: ids } }
    ).then();
  }

  // deleting current documents
  const menuSection = await MenuSection.deleteMany({ _id: ids }).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Menu Section Ids=${ids}`,
    menuManager,
    menuSection,
  });

  next();
});
