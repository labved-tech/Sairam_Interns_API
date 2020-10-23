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
const chartsRouter = require('./routes/precisionAg/chartsRoutes');
const farmEntriesRouter = require('./routes/precisionAg/farmEntriesRoutes');
const farmExportedStrategyRouter = require('./routes/precisionAg/farmExportedStrategyRoutes');
const farmRegionsRouter = require('./routes/precisionAg/farmRegionsRoutes');
const farmStrategyRouter = require('./routes/precisionAg/farmStrategyRoutes');
const formResponseRouter = require('./routes/precisionAg/formResponseRoutes');
const formsRouter = require('./routes/precisionAg/formsRoutes');
const pagesRouter = require('./routes/precisionAg/pagesRoutes');
const reportsRouter = require('./routes/precisionAg/reportsRoutes');

const milestoneRouter = require('./routes/project_man_n_tasks/milestoneRoutes');
const projectActivityRouter = require('./routes/project_man_n_tasks/projectActivityRoutes');
const projectAdminsRouter = require('./routes/project_man_n_tasks/projectAdminsRoutes');
const projectDiscussionCommentsRouter = require('./routes/project_man_n_tasks/projectDiscussionCommentsRoutes');
const projectDiscussionsRouter = require('./routes/project_man_n_tasks/projectDiscussionsRoutes');
const projectEntriesRouter = require('./routes/project_man_n_tasks/projectEntriesRoutes');
const projectFilesRouter = require('./routes/project_man_n_tasks/projectFilesRoutes');
const projectMembersRouter = require('./routes/project_man_n_tasks/projectMembersRoutes');
const projectNotesRouter = require('./routes/project_man_n_tasks/projectNotesRoutes');
const projectTaskFilesRouter = require('./routes/project_man_n_tasks/projectTaskFilesRoutes');
const projectTaskStatusRouter = require('./routes/project_man_n_tasks/projectTaskStatusRoutes');
const taskChecklistEntriesRouter = require('./routes/project_man_n_tasks/taskChecklistEntriesRoutes');
const taskChecklistStatusRouter = require('./routes/project_man_n_tasks/taskChecklistStatusRoutes');
//const taskEntriesRouter = require('./routes/project_man_n_tasks/taskEntriesRoutes');
const taskRemindersRouter = require('./routes/project_man_n_tasks/taskRemindersRoutes');
const taskTimersRouter = require('./routes/project_man_n_tasks/taskTimersRoutes');

const newsletterEntriesRouter = require('./routes/newsletter/newsletterEntriesRoutes');
const newsletterMessagesRouter = require('./routes/newsletter/newsletterMessagesRoutes');

const addressRouter = require('./routes/sales&finance/addressRoutes');
const deliveryNoteRouter = require('./routes/sales&finance/deliveryNoteRoutes');
const packingListRouter = require('./routes/sales&finance/packingListRoutes');
//const perfomaInvoiceRouter = require('./routes/sales&finance/perfomaInvoiceRoutes');
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

app.use('/api/v1/analytics',analyticsRouter);
app.use('/api/v1/charts',chartsRouter);
app.use('/api/v1/farm-entries',farmEntriesRouter);
app.use('/api/v1/farm-exported-strategy',farmExportedStrategyRouter);
app.use('/api/v1/farm-regions',farmRegionsRouter);
app.use('/api/v1/farm-strategy',farmStrategyRouter);
app.use('/api/v1/form-response',formResponseRouter);
app.use('/api/v1/forms',formsRouter);
app.use('/api/v1/pages',pagesRouter);
app.use('/api/v1/reports',reportsRouter);

app.use('/api/v1/milestone',milestoneRouter);
app.use('/api/v1/project-activity',projectActivityRouter);
app.use('/api/v1/project-admins',projectAdminsRouter);
app.use('/api/v1/project-discussion-comments',projectDiscussionCommentsRouter);
app.use('/api/v1/project-discussions',projectDiscussionsRouter);
app.use('/api/v1/project-entries',projectEntriesRouter);
app.use('/api/v1/project-files',projectFilesRouter);
app.use('/api/v1/project-members',projectMembersRouter);
app.use('/api/v1/project-notes',projectNotesRouter);
app.use('/api/v1/project-task-files',projectTaskFilesRouter);
app.use('/api/v1/project-task-status',projectTaskStatusRouter);
app.use('/api/v1/task-checklist-entries',taskChecklistEntriesRouter);
app.use('/api/v1/task-checklist-status',taskChecklistStatusRouter);
//app.use('/api/v1/task-entries',taskEntriesRouter);
app.use('/api/v1/task-reminders',taskRemindersRouter);
app.use('/api/v1/task-timers',taskTimersRouter);



app.use('/api/v1/newsletter-entries', newsletterEntriesRouter);
app.use('/api/v1/newsletter-entries', newsletterMessagesRouter);

app.use('/api/v1/address',addressRouter);
app.use('/api/v1/delivery-note',deliveryNoteRouter);
app.use('/api/v1/packing-list',packingListRouter);
//app.use ('/api/v1/perfoma-invoice',perfomaInvoiceRouter);
app.use('/api/v1/quotation',quotationRouter);
app.use('/api/v1/tax-invoice',taxInvoiceRouter);
module.exports = app;
