/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const AnnouncementEntries = require('../../models/announcement/announcementEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllAnnouncementEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All Announcement Entries');

  const announcementEntries = await AnnouncementEntries.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Announcement Entries',
    results: announcementEntries.length,
    data: {
      announcementEntries,
    },
  });
  next();
});

exports.getAnnouncementEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Announcement Entries for Id ${id}`);

  const announcementEntries = await AnnouncementEntries.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Announcement Entries Id=${id}`,
    Data: { announcementEntries },
  });

  next();
});

exports.createAnnouncementEntries = catchAsync(async (req, res, next) => {
  console.log('Creating Announcement Entries');
  const { body } = req;

  // parse through models
  const doc = new AnnouncementEntries(body);


  // targetConditions
  if (doc.targetConditions) {
    const targetConditionsLength = doc.targetConditions.length;
    console.log(`Array of objects length ${targetConditionsLength}`);

    for (let i = 0; i < targetConditionsLength; i++) {
      doc.targetConditions[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.targetConditions[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.targetConditions[i].createdAt = Date.now();
      doc.targetConditions[i].updatedAt = Date.now();
    }
  }


  doc.createdBy = '5f990bb3c727e952a076f3b7';


  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const announcementEntries = await AnnouncementEntries.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Announcement Entries',
    data: { announcementEntries },
  });

  next();
});

exports.updateAnnouncementEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Announcement Entries Id ${id}`);
  const { body } = req;

  // parse through models
  const announcementEntriesToUpdate = new AnnouncementEntries(body);
  console.log(body);
  const doc = announcementEntriesToUpdate.toObject();
  delete doc._id;

  if (announcementEntriesToUpdate.targetConditions) {
    const len = announcementEntriesToUpdate.targetConditions.length;
    console.log(len);
  }


  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const announcementEntries = await AnnouncementEntries.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Announcement Entries Id=${id}`,
    data: { announcementEntries },
  });

  next();
});

exports.deleteAnnouncementEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Announcement Entries Id ${id}`);

  const announcementEntries = await AnnouncementEntries.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Announcement Entries Id =${id}`,
    data: { announcementEntries },
  });

  next();
});
