/* DEPENDENCIES */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const User = require('../../models/user/userModel');
const PersonalDetails = require('../../models/general/personalDetailsModel');
const OrganisationDetails = require('../../models/general/organisationDetailsModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllUser = catchAsync(async (req, res, next) => {
  console.log('Getting All User');
  const users = await User.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Users',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting User for Id ${id}`);
  const user = await User.findById(id).then();

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    message: `Got User Id=${id}`,
    Data: { user },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  console.log('Creating User');

  // parse through models
  const doc = new User(req.body);
  console.log(doc);

  const dataPersonalDetails = new PersonalDetails(
    JSON.parse(JSON.stringify(req.body.personalDetails))
  );

  // validate seperately sub-documents if necessary
  //await dataPersonalDetails.validate();

  // replace doc if necessary
  doc.personalDetails = dataPersonalDetails;

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // saving if there are no sub-documents
  //doc.save();

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  // database operation
  const user = await User.create(doc).then();
  res.status(201).json({
    status: 'sucess',
    message: 'Created User',
    data: { user },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating User Id ${id}`);

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated User Id=${id}`,
    data: { user },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting User Id ${id}`);

  const user = await User.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted User Id=${id}`,
    data: { user },
  });
});
