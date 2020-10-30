/* DEPENDENCIES */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* MIDDLEWARES */
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('./../../../utils/appError');
const Users = require('../../../models/account-settings/user/userInformationModel');
const PersonalDetails = require('../../../models/general/personalDetailsModel');
const OrganisationDetails = require('../../../models/general/organisationDetailsModel');


/* DATABASE */

/* CONTROLLERS */
exports.signup = catchAsync(async (req, res, next) => {
  console.log('Welcome to sign-up');

  const newUser = await Users.create({
    name: req.body.name,
    email:req.body.email,
    password : req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    accountType: req.body.accountType
    
  });

  const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  res.status(201).json({
    status: 'sucess',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;

  // 1) Check if email and password exists
  if(!email || !password)
    return next(new AppError('Please provide email and password!', 400))

  // 2) Check if user exists && password is correct
  const user = Users.findOne({email})

  // 3) If everything o, send token to client
  const token = '';
  res.status(200).json({
    status: 'sucess',
    token
  })
});
