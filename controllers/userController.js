/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const UserInformation = require('../models/userInformationModel');
const PersonalDetails = require('../models/personalDetailsModel');
const OrganisationDetails = require('../models/organisationDetailsModel');

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllUser = async (req, res, next) => {
  console.log('Getting All User');

  try {
    const users = await UserInformation.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Users',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting User for Id ${id}`);

  try {
    const user = await UserInformation.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got User Id=${id}`,
      Data: { user },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createUser = async (req, res, next) => {
  console.log('Creating User');

  // parse through models
  const doc = new UserInformation(req.body);
  const dataPersonalDetails = new PersonalDetails(
    JSON.parse(JSON.stringify(req.body.personalDetails))
  );

  // validate
  await dataPersonalDetails.validate();

  // replace doc if necessary
  doc.personalDetails = dataPersonalDetails;

  // final validation
  await doc.validate();
  //console.log(doc);

  // database operation
  try {
    const user = await UserInformation.create(doc).then();
    res.status(201).json({
      status: 'sucess',
      message: 'Created User',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating User Id ${id}`);

  try {
    const user = await UserInformation.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated User Id=${id}`,
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting User Id ${id}`);

  try {
    const user = await UserInformation.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted User Id=${id}`,
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
