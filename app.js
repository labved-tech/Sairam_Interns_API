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
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const apiv1Router = require('./routes/apiv1Routes');

const exampleRouter = require('./routes/exampleRoutes');
const menuRouter = require('./routes/account-settings/menu/menuRoutes');

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
app.use('/api/v1', apiv1Router);

app.use('/api/v1/example', exampleRouter);
app.use('/api/v1/menu-manager', menuRouter);

// Global can't find routes
<<<<<<< Updated upstream
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });
=======
//app.all('*', (req, res, next) => {
  //next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
//});
>>>>>>> Stashed changes

// Global error handler message
app.use(globalErrorHandler);

module.exports = app;
