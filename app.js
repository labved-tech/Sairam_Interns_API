/* DEPENDENCIES */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const slugify = require('slugify');
const url = require('url');
const cookieParser = require('cookie-parser');
const contentSecurityPolicy = require('helmet-csp');
const crypto = require('crypto');

/* MIDDLEWARES */

/* USER DEFINED MIDDLEWARES */
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const apiv1Router = require('./routes/apiv1Routes');

/* ENVIRONMENT */

/* GLOBAL MIDDLEWARE USAGE*/
const app = express();

// Set Secutiry HTTP headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour !',
});
app.use('/api', limiter);

// Body Parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data Santization against NoSQL Query injection
app.use(mongoSanitize());

// Data Santization against XSS
app.use(xss());

// Prevent parameter Pollution
app.use(hpp());

// Serving Static Files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

// Content Security Policy
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('hex');
  next();
});
app.use(
  // <meta http-equiv="Content-Security-Policy" content="script-src-elem 'self' ; default-src 'self'; style-src 'self';" >

  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'fonts.googleapis.com'],
      styleSrc: ["'self'", 'fonts.googleapis.com'],
      styleSrcElm: ["'self'", 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.googleapis.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
  })
);

// Template Engine
app.set('view engine', 'pug');

// Test Middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    /*//console.log(req.url);
    //console.log(url.parse(req.url, true));
    const { query, pathname } = url.parse(req.url, true);
    console.log(`URL Pathname is ${pathname}`);
    console.log(`URL Query Id is ${query.id}`); */
    req.requestTime = new Date().toISOString();
    //console.log(req.cookies);
  }

  next();
});

/* ROUTES */

// PAGE
app.use('/', viewRouter);

// API
app.use('/api/v1', apiv1Router);

// Global can't find routes
//app.all('*', (req, res, next) => {
//next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
//});

// Global error handler message
app.use(globalErrorHandler);

module.exports = app;
