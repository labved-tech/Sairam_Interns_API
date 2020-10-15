/* DEPENDENCIES */
const mongoose = require('mongoose');
const userInformation = require('../models/userInformationModel');

/* MIDDLEWARES */
const UserInformation = require('../models/userInformationModel');

// ROUTE HANDLERS
exports.getAllUsers = (req, res, next) => {
  console.log('Getting All Users');
  res.status(200).json({ status: 'my-app', message: 'Getting All Users' });
  next();
};

exports.getUser = (req, res, next) => {
  console.log('Getting One User');
  res.status(200).json({ status: 'my-app', message: 'Getting One User' });
  next();
};

exports.createUser = async (req, res, next) => {
  console.log('Creating User');

  res.status(200).json({ status: 'my-app', message: 'Created User' });
  next();
};

exports.updateUser = (req, res, next) => {
  console.log('Update User');
  res.status(200).json({ status: 'my-app', message: 'Update User' });
  next();
};

exports.deleteUser = (req, res, next) => {
  console.log('Delete User');
  res.status(200).json({ status: 'my-app', message: 'Delete User' });
  next();
};
