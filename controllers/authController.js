/* DEPENDENCIES */


/* MIDDLEWARES */
const User = require('./../models/account-settings/user/userInformationModel');
const catchAsync = require('./../utils/catchAsync');

/* DATABASE */



/* CONTROLLERS */
exports.signup = catchAsync(async(req, res, next) => {
    const newUser = await User.create(req.body)

    res.status(201).json({
        status : 'sucess',
        data :{
            user:newUser
        }
    });
});