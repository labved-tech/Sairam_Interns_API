/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const MenuItem = require('../../models/menu/menuItemsModel');

/* DATABASE */

/* CONTROLLERS */
exports.getAllMenuItem = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu Items');

  const item = await MenuItem.find()
    .populate('_subItem1')
    .sort('priority')
    .then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Menu Items',
    results: item.length,
    item,
  });
  next();
});

exports.getMenuItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Menu Items with Id ${id}`);

  const item = await MenuItem.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Menu Items Id=${id}`,
    item,
  });

  next();
});

exports.createMenuItem = catchAsync(async (req, res, next) => {
  console.log('Creating Menu Items');
  //console.log(req.body);

  // parse through models
  const doc = new MenuItem(req.body);
  // console.log(doc);

  const priority = req.body.priority * 1;
  doc.priority = priority;

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(doc);

  const newItem = await MenuItem.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Menu Items',
    newItem,
  });

  next();
});

exports.updateMenuItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Menu Items Id ${id}`);

  const item = await MenuItem.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Menu Items Id=${id}`,
    item,
  });

  next();
});

exports.deleteMenuItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Menu  Items Id ${id}`);

  const item = await MenuItem.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Menu Items Id=${id}`,
    item,
  });

  next();
});
