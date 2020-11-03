/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Menu = require('../../models/menu/menuManagerModel');

/* DATABASE */

/* CONTROLLERS */
exports.getAllMenu = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu');

  const menus = await Menu.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Menus',
    results: menus.length,
    data: {
      menus,
    },
  });
  next();
});

exports.getMenu = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Menu with Id ${id}`);

  const menu = await Menu.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Menu Id=${id}`,
    data: { menu },
  });

  next();
});

exports.createMenu = catchAsync(async (req, res, next) => {
  console.log('Creating Menu');
  //console.log(req.body);

  // parse through models
  const doc = new Menu(req.body);
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

  const newMenu = await Menu.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Menu',
    newMenu,
  });

  next();
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Menu Id ${id}`);

  // parse through models
  const menuToUpdate = new Menu(body);
  const doc = menuToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  console.log(doc);

  const menu = await Menu.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Menu Id=${id}`,
    data: { menu },
  });

  next();
});

exports.deleteMenu = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Menu Id ${id}`);

  const menu = await Menu.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Menu Id=${id}`,
    data: { menu },
  });

  next();
});
