/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const DirectoryEntries = require('./../../models/directory/directoryEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectoryEntries = catchAsync(async (req, res, next)=> {
  console.log('Getting All DirectoryEntries');

  
    const directories = await DirectoryEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All DirectoryEntries',
      results: directories.length,
      data: {
        directories,
      },
    });


  next();
});

exports.getDirectoryEntries = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Getting DirectoryEntries for Id ${id}`);

  
    const directoryEntries = await DirectoryEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got DirectoryEntries Id=${id}`,
      Data: { directoryEntries },
    });


  next();
});

exports.createDirectoryEntries = catchAsync(async (req, res, next)=> {
  console.log('Creating directoryEntries');
  // parse through models
  const doc = new DirectoryEntries(req.body);
  console.log(doc);

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
  
    const directoryEntries = await DirectoryEntries.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created DirectoryEntries',
      data: { directoryEntries },
    });


  next();
});

exports.updateDirectoryEntries = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Updating DirectoryEntries Id ${id}`);

  
    const directoryEntries = await DirectoryEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated DirectoryEntries Id=${id}`,
      data: { directoryEntries },
    });


  next();
});

exports.deleteDirectoryEntries = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Deleting DirectoryEntries Id ${id}`);

  
    const directoryEntries = await DirectoryEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted DirectoryEntries Id=${id}`,
      data: { directoryEntries },
    });


  next();
});