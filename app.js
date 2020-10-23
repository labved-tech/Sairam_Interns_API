/* DEPENDENCIES */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const url = require('url');
const slugify = require('slugify');

/* MIDDLEWARES */
const app = express();
app.use(express.json());

/* USER DEFINED MIDDLEWARES */
const viewRouter = require('./routes/viewRoutes');
const exampleRouter = require('./routes/exampleRoutes');
const userRouter = require('./routes/userRoutes');
const menuRouter = require('./routes/menuRoutes');

/* INTERN */
const newsletterEntriesRouter = require('./routes/newsletter/newsletterEntriesRoutes');
const leadEntriesRouter = require('./routes/leads/leadEntriesRoutes');


/* ENVIRONMENT */
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/* GLOBAL MIDDLEWARE USAGE*/

// Serving Static Files
console.log(`Directory Name: ${__dirname}`);
app.use(express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    //console.log(req.url);
    //console.log(url.parse(req.url, true));
    const { query, pathname } = url.parse(req.url, true);
    console.log(`URL Pathname is ${pathname}`);
    console.log(`URL Query Id is ${query.id}`);
  }
  next();
});


/* ROUTES */

// PAGE
app.use('/', viewRouter);

// API
app.use('/api/v1/example', exampleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/menu-manager', menuRouter);

// INTERNS 
app.use('/api/v1/newsletter-entries', newsletterEntriesRouter);
app.use('/api/v1/lead-entries',leadEntriesRouter);

module.exports = app;
