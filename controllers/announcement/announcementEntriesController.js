/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const AnnouncementEntries = require('./../../models/announcement/announcementEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllAnnouncementEntries = async (req, res, next) => {
  console.log('Getting All Announcement Entries');

  try {
    const announcementEntries = await AnnouncementEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Announcement Entries',
      results: announcementEntries.length,
      data: {
        announcementEntries,
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

exports.getAnnouncementEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Announcement Entries for Id ${id}`);

  try {
    const announcementEntries = await AnnouncementEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Announcement Entries Id=${id}`,
      Data: { announcementEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createAnnouncementEntries = async (req, res, next) => {
  console.log('Creating Announcement Entries');

  try {
    const announcementEntries = await AnnouncementEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Announcement Entries',
      data: {announcementEntries},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateAnnouncementEntries= async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Announcement Entries Id ${id}`);

  try {
    const announcementEntries= await AnnouncementEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Announcement Entries Id=${id}`,
      data: { announcementEntries},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteAnnouncementEntries= async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Announcement Entries Id ${id}`);

  try {
    const announcementEntries= await AnnouncementEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted Announcement Entries Id =${id}`,
      data: { announcementEntries},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
