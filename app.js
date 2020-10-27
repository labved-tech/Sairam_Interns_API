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

const analyticsRouter = require('./routes/precision-agriculture/analyticsRoutes');

const chartsRouter = require('./routes/precision-agriculture/chartsRoutes');

const farmEntriesRouter = require('./routes/precision-agriculture/farmEntriesRoutes');
const farmExportedStrategyRouter = require('./routes/precision-agriculture/farmExportedStrategyRoutes');
const farmRegionsRouter = require('./routes/precision-agriculture/farmRegionsRoutes');
const farmStrategyRouter = require('./routes/precision-agriculture/farmStrategyRoutes');
const formResponseRouter = require('./routes/precision-agriculture/formResponseRoutes');
const formsRouter = require('./routes/precision-agriculture/formsRoutes');

const pagesRouter = require('./routes/precision-agriculture/pagesRoutes');
const reportsRouter = require('./routes/precision-agriculture/reportsRoutes');

const milestoneRouter = require('./routes/project-management/milestoneRoutes');

const projectActivityRouter = require('./routes/project-management/projectActivityRoutes');
const projectAdminsRouter = require('./routes/project-management/projectAdminsRoutes');
const projectDiscussionCommentsRouter = require('./routes/project-management/projectDiscussionCommentsRoutes');
const projectDiscussionsRouter = require('./routes/project-management/projectDiscussionsRoutes');
const projectEntriesRouter = require('./routes/project-management/projectEntriesRoutes');
const projectFilesRouter = require('./routes/project-management/projectFilesRoutes');
const projectMembersRouter = require('./routes/project-management/projectMembersRoutes');
const projectNotesRouter = require('./routes/project-management/projectNotesRoutes');
const projectTaskFilesRouter = require('./routes/project-management/projectTaskFilesRoutes');
const projectTaskStatusRouter = require('./routes/project-management/projectTaskStatusRoutes');
const taskChecklistEntriesRouter = require('./routes/project-management/taskChecklistEntriesRoutes');
const taskChecklistStatusRouter = require('./routes/project-management/taskChecklistStatusRoutes');
//const taskEntriesRouter = require('./routes/project-management/taskEntriesRoutes');
const taskRemindersRouter = require('./routes/project-management/taskRemindersRoutes');
const taskTimersRouter = require('./routes/project-management/taskTimersRoutes');

const newsletterEntriesRouter = require('./routes/newsletter/newsletterEntriesRoutes');
const newsletterMessagesRouter = require('./routes/newsletter/newsletterMessagesRoutes');

const addressRouter = require('./routes/sales-finance/addressRoutes');
const deliveryNoteRouter = require('./routes/sales-finance/deliveryNoteRoutes');
const packingListRouter = require('./routes/sales-finance/packingListRoutes');
//const perfomaInvoiceRouter = require('./routes/sales-finance/perfomaInvoiceRoutes');
const quotationRouter = require('./routes/sales-finance/quotationRoutes');
const taxInvoiceRouter = require('./routes/sales-finance/taxInvoiceRoutes');

const ratingAttributeGroupsRouter = require('./routes/ratings/ratingAttributeGroupsRoutes');
const ratingAttributeRouter = require('./routes/ratings/ratingAttributeRoutes');
const ratingEntriesRouter = require('./routes/ratings/ratingEntriesRoutes');

const ecommerceAddressRouter = require('./routes/ecommerce/ecommerceAddressRoutes');
const ecommerceLocationsRouter = require('./routes/ecommerce/ecommerceLocationsRoutes');
const ecommerceProductsRouter = require('./routes/ecommerce/ecommerceProductsRoutes');
const ecommerceOrderRouter = require('./routes/ecommerce/ecommerceOrderRoutes');
const ecommerceStockRouter = require('./routes/ecommerce/ecommerceStockRoutes');

const commentEntriesRouter = require('./routes/comments/commentEntriesRoutes');

const eventEntriesRouter = require('./routes/events/eventEntriesRoutes');

const contractEntriesRouter = require('./routes/contract/contractEntriesRoutes');
const contractTemplatesRouter = require('./routes/contract/contractTemplatesRoutes');

const ticketCategoriesRouter = require('./routes/ticket-support/ticketCategoriesRoutes');
const ticketEntriesRouter = require('./routes/ticket-support/ticketEntriesRoutes');
const ticketProductsRouter = require('./routes/ticket-support/ticketProductsRoutes');
const ticketResponseRouter = require('./routes/ticket-support/ticketResponseRoutes');

const directoryAttributesRouter = require('./routes/directory/directoryAttributesGroupsRoutes');
const directoryCategoriesRouter = require('./routes/directory/directoryCategoriesRoutes');
const directoryEntriesRouter = require('./routes/directory/directoryEntriesRoutes');
const directoryLevelsRouter = require('./routes/directory/directoryLevelsRoutes');
const directoryRouter = require('./routes/directory/directoryRoutes');

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

app.use('/api/v1/lead-entries', leadEntriesRouter);
app.use('/api/v1/lead-response', leadResponseRouter);
app.use('/api/v1/lead-categories', leadCategoriesRouter);

app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/charts', chartsRouter);
app.use('/api/v1/farm-entries', farmEntriesRouter);
app.use('/api/v1/farm-exported-strategy', farmExportedStrategyRouter);
app.use('/api/v1/farm-regions', farmRegionsRouter);
app.use('/api/v1/farm-strategy', farmStrategyRouter);
app.use('/api/v1/form-response', formResponseRouter);
app.use('/api/v1/forms', formsRouter);
app.use('/api/v1/pages', pagesRouter);
app.use('/api/v1/reports', reportsRouter);

app.use('/api/v1/milestone', milestoneRouter);
app.use('/api/v1/project-activity', projectActivityRouter);
app.use('/api/v1/project-admins', projectAdminsRouter);
app.use('/api/v1/project-discussion-comments', projectDiscussionCommentsRouter);
app.use('/api/v1/project-discussions', projectDiscussionsRouter);
app.use('/api/v1/project-entries', projectEntriesRouter);
app.use('/api/v1/project-files', projectFilesRouter);
app.use('/api/v1/project-members', projectMembersRouter);
app.use('/api/v1/project-notes', projectNotesRouter);
app.use('/api/v1/project-task-files', projectTaskFilesRouter);
app.use('/api/v1/project-task-status', projectTaskStatusRouter);
app.use('/api/v1/task-checklist-entries', taskChecklistEntriesRouter);
app.use('/api/v1/task-checklist-status', taskChecklistStatusRouter);
//app.use('/api/v1/task-entries',taskEntriesRouter);
app.use('/api/v1/task-reminders', taskRemindersRouter);
app.use('/api/v1/task-timers', taskTimersRouter);

app.use('/api/v1/newsletter-entries', newsletterEntriesRouter);
app.use('/api/v1/newsletter-messages', newsletterMessagesRouter);

app.use('/api/v1/address', addressRouter);
app.use('/api/v1/delivery-note', deliveryNoteRouter);
app.use('/api/v1/packing-list', packingListRouter);
//app.use ('/api/v1/perfoma-invoice',perfomaInvoiceRouter);
app.use('/api/v1/quotation', quotationRouter);
app.use('/api/v1/tax-invoice', taxInvoiceRouter);

app.use('/api/v1/commentEntries', commentEntriesRouter);

app.use('/api/v1/ecommerrceAddress', ecommerceAddressRouter);
app.use('/api/v1/ecommerceLocations', ecommerceLocationsRouter);
app.use('/api/v1/ecommerceOrder', ecommerceOrderRouter);
app.use('/api/v1/ecommerceProducts', ecommerceProductsRouter);
app.use('/api/v1/ecommerceStock', ecommerceStockRouter);

app.use('/api/v1/ratingAttributeGroups', ratingAttributeGroupsRouter);
app.use('/api/v1/ratingAttribute', ratingAttributeRouter);
app.use('/api/v1/ratingEntries', ratingEntriesRouter);

app.use('/api/v/directoryAttributes', directoryAttributesRouter);
app.use('/api/v/directoryCategories', directoryCategoriesRouter);
app.use('/api/v/directoryEntries', directoryEntriesRouter);
app.use('/api/v/directoryLevels', directoryLevelsRouter);
app.use('/api/v/directory', directoryRouter);

app.use('/api/v/commentEntries', commentEntriesRouter);

app.use('/api/v/eventEntries', eventEntriesRouter);

app.use('/api/v/contractEntries', contractEntriesRouter);
app.use('/api/v/contractTemplates', contractTemplatesRouter);

app.use('/api/v/ticketCategories', ticketCategoriesRouter);
app.use('/api/v/ticketEntries', ticketEntriesRouter);
app.use('/api/v/ticketProducts', ticketProductsRouter);
app.use('/api/v/ticketResponse', ticketResponseRouter);

module.exports = app;
