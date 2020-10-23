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

//INTERNS
const announcementEntriesRouter = require('./routes/announcement/announcementEntriesRoutes');
const announcementNotifyRouter = require('./routes/announcement/announcementNotifyRoutes');
const leadEntriesRouter = require('./routes/leads/leadEntriesRoutes');
const leadCategoriesRouter = require('./routes/leads/leadCategoriesRoutes');
const leadResponseRouter = require('./routes/leads/leadResponseRoutes');
const analyticsRouter = require('./routes/precisionAg/analyticsRoutes');
const newsletterEntriesRouter = require('./routes/newsletter/newsletterEntriesRoutes');
const newsletterMessagesRouter = require('./routes/newsletter/newsletterMessagesRoutes');

const addressRouter = require('./routes/sales&finance/addressRoutes');
const deliveryNoteRouter = require('./routes/sales&finance/deliveryNoteRoutes');
const packingListRouter = require('./routes/sales&finance/packingListRoutes');
const perfomaInvoiceRouter = require('./routes/sales&finance/perfomaInvoiceRoutes');
const quotationRouter = require('./routes/sales&finance/quotationRoutes');
const taxInvoiceRouter = require('./routes/sales&finance/taxInvoiceRoutes');

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
app.use('/api/v1/announcement-entries', announcementEntriesRouter);
app.use('/api/v1/announcement-notify', announcementNotifyRouter);
app.use('/api/v1/lead-entries',leadEntriesRouter);
app.use('/api/v1/lead-response',leadResponseRouter);
app.use('/api/v1/lead-categories',leadCategoriesRouter);
app.use('/api/v1/analytics', analyticsRouter);

app.use('/api/v1/newsletter-entries', newsletterEntriesRouter);
app.use('/api/v1/newsletter-entries', newsletterMessagesRouter);

app.use('/api/v1/address',addressRouter);
app.use('/api/v1/delivery-note',deliveryNoteRouter);
app.use('/api/v1/packing-list',packingListRouter);
app.use ('/api/v1/perfoma-invoice',perfomaInvoiceRouter);
app.use('/api/v1/quotation',quotationRouter);
app.use('/api/v1/tax-invoice',taxInvoiceRouter);
module.exports = app;
