/* DEPENDENCIES */

/* MIDDLEWARES */
const Users = require('../../../models/account-settings/user/userInformationModel');
const PersonalDetails = require('../../../models/general/personalDetailsModel');
const OrganisationDetails = require('../../../models/general/organisationDetailsModel');
const catchAsync = require('../../../utils/catchAsync');

/* DATABASE */

/* CONTROLLERS */
exports.signup = catchAsync(async (req, res, next) => {
  console.log('Welcome to sign-up');
  // parse through models
  const doc = new Users(req.body);
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
  console.log(doc);

  const newUser = await Users.create(doc);

  res.status(201).json({
    status: 'sucess',
    data: {
      user: newUser,
    },
  });
});
