/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Directory = require('./../../models/directory/directoryModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectory = catchAsync(async (req, res, next)=> {
  console.log('Getting All Directory');

  
    const directories = await Directory.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Directory',
      results: directories.length,
      data: {
        directories,
      },
    });


  next();
});

exports.getDirectory = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Getting Directory for Id ${id}`);

  
    const directory = await Directory.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Directory Id=${id}`,
      Data: { directory },
    });


  next();
});

exports.createDirectory = catchAsync(async (req, res, next)=> {
  console.log('Creating directory');
  // parse through models
  const doc = new AnnouncementEntries(req.body);
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
  
    const directory = await Directory.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Directory',
      data: { directory },
    });


  next();
});

exports.updateDirectory = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Updating Directory Id ${id}`);

  
    const directory = await Directory.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Directory Id=${id}`,
      data: { directory },
    });


  next();
});

exports.deleteDirectory = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Deleting Directory Id ${id}`);

  
    const directory = await Directory.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted Directory Id=${id}`,
      data: { directory },
    });


  next();
});
