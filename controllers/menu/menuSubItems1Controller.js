/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const MenuSubItem1 = require('../../models/menu/menuSubItems1Model');

/* DATABASE */

/* CONTROLLERS */
exports.getAllMenuSubItem1 = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu Sub-Item1');

  const menuItem = await MenuSubItem1.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Menu Sub-Item1',
    results: menuItem.length,
    menuItem,
  });
  next();
});

exports.getMenuSubItem1 = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Menu Sub-Item1 with Id ${id}`);

  const menuItem = await MenuSubItem1.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Menu Sub-Item1 Id=${id}`,
    menuItem,
  });

  next();
});

exports.createMenuSubItem1 = catchAsync(async (req, res, next) => {
  console.log('Creating Menu Sub-Item1');
  //console.log(req.body);

  // parse through models
  const doc = new MenuSubItem1(req.body);
  console.log(doc);

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const newMenuItem = await MenuSubItem1.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Menu Sub-Item1',
    newMenuItem,
  });

  next();
});

exports.updateMenuSubItem1 = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Menu Sub-Item1 Id ${id}`);

  const menuItem = await MenuSubItem1.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Menu Sub-Item1 Id=${id}`,
    menuItem,
  });

  next();
});

exports.deleteMenuSubItem1 = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Menu Sub-Item1 Id ${id}`);

  const menuItem = await MenuSubItem1.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Menu Sub-Item1 Id=${id}`,
    menuItem,
  });

  next();
});
