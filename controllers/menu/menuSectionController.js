/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const MenuSection = require('../../models/menu/menuSectionModel');

/* DATABASE */

/* CONTROLLERS */
exports.getAllMenuSection = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu Sections');

  const menuSection = await MenuSection.find().then();

  res.status(200).json({
    status: 'sucess',
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
  res.status(200).json({
    status: 'sucess',
    message: `Got Menu Section Id=${id}`,
    menuSection,
  });

  next();
});

exports.createMenuSection = catchAsync(async (req, res, next) => {
  console.log('Creating Menu Sections');
  //console.log(req.body);

  // parse through models
  const doc = new MenuSection(req.body);
  //console.log(doc);

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(doc);

  const menuSection = await MenuSection.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Menu Section',
    menuSection,
  });

  next();
});

exports.updateMenuSection = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Menu Section Id ${id}`);

  const menuSection = await MenuSection.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Menu Section Id=${id}`,
    menuSection,
  });

  next();
});

exports.deleteMenuSection = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Menu Section Id ${id}`);

  const menuSection = await MenuSection.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Menu Section Id=${id}`,
    menuSection,
  });

  next();
});
