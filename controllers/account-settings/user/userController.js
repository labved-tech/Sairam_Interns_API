/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../../utils/catchAsync');
const UserInformation = require('../../../models/account-settings/user/userInformationModel');
const PersonalDetails = require('../../../models/general/personalDetailsModel');
const OrganisationDetails = require('../../../models/general/organisationDetailsModel');

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

exports.createUser = catchAsync(async (req, res, next) => {
  console.log('Creating User');

  // parse through models
  const doc = new UserInformation(req.body);
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
  const user = await UserInformation.create(doc).then();
  res.status(201).json({
    status: 'sucess',
    message: 'Created User',
    data: { user },
  });
});
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
