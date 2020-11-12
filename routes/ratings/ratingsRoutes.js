/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ratingAttributeGroupsRouter = require('./ratingAttributeGroupsRoutes');
const ratingAttributeRouter = require('./ratingAttributeRoutes');
const ratingEntriesRouter = require('./ratingEntriesRoutes');


/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Ratings Routes');
  next();
});

/* ROUTES */
router.use('/attribute-groups', ratingAttributeGroupsRouter);
router.use('/attribute', ratingAttributeRouter);
router.use('/entries', ratingEntriesRouter);


module.exports = router;
