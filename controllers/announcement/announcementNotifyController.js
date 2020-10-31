/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const AnnouncementNotify = require('../../models/announcement/announcementNotifyModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllAnnouncementNotify = catchAsync(async (req, res, next) => {
  console.log('Getting All Announcement Notify');

  const announcementNotify = await AnnouncementNotify.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Announcement Notify',
    results: announcementNotify.length,
    data: {
      announcementNotify,
    },
  });

  next();
});

exports.getAnnouncementNotify = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Announcement Notify for Id ${id}`);

  const announcementNotify = await AnnouncementNotify.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Announcement Notify Id=${id}`,
    Data: { announcementNotify },
  });

  next();
});

exports.createAnnouncementNotify = catchAsync(async (req, res, next) => {
  console.log('Creating Announcement Notify');

  // parse through models
  const doc = new AnnouncementNotify(req.body);

  // validate seperately sub-documents if necessary

  // replace doc if necessary

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const announcementNotify = await AnnouncementNotify.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Announcement Notify',
    data: { announcementNotify },
  });

  next();
});

exports.updateAnnouncementNotify = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Announcement Notify Id ${id}`);

  const announcementNotify = await AnnouncementNotify.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Announcement Notify Id=${id}`,
    data: { announcementNotify },
  });

  next();
});

exports.deleteAnnouncementNotify = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Announcement Notify Id ${id}`);

  const announcementNotify = await AnnouncementNotify.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Announcement Notify Id=${id}`,
    data: { announcementNotify },
  });

  next();
});
