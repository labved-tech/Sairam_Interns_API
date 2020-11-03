/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();

const exampleRouter = require('./example/exampleRoutes');

const userRouter = require('./user/userRoutes');

const analyticsRouter = require('./analytics/analyticsRoutes');

const formResponseRouter = require('./forms/formResponseRoutes');
const formsRouter = require('./forms/formsRoutes');

const chartsRouter = require('./charts/chartsRoutes');

const pagesRouter = require('./pages/pagesRoutes');

const reportsRouter = require('./reports/reportsRoutes');

const announcementEntriesRouter = require('./announcement/announcementEntriesRoutes');
const announcementNotifyRouter = require('./announcement/announcementNotifyRoutes');

const leadEntriesRouter = require('./leads/leadEntriesRoutes');
const leadCategoriesRouter = require('./leads/leadCategoriesRoutes');
const leadResponseRouter = require('./leads/leadResponseRoutes');

const farmEntriesRouter = require('./precision-agriculture/farmEntriesRoutes');
const farmExportedStrategyRouter = require('./precision-agriculture/farmExportedStrategyRoutes');
const farmRegionsRouter = require('./precision-agriculture/farmRegionsRoutes');
const farmStrategyRouter = require('./precision-agriculture/farmStrategyRoutes');

const milestoneRouter = require('./project-management/milestoneRoutes');

const projectActivityRouter = require('./project-management/projectActivityRoutes');
const projectAdminsRouter = require('./project-management/projectAdminsRoutes');
const projectDiscussionCommentsRouter = require('./project-management/projectDiscussionCommentsRoutes');
const projectDiscussionsRouter = require('./project-management/projectDiscussionsRoutes');
const projectEntriesRouter = require('./project-management/projectEntriesRoutes');
const projectFilesRouter = require('./project-management/projectFilesRoutes');
const projectMembersRouter = require('./project-management/projectMembersRoutes');
const projectNotesRouter = require('./project-management/projectNotesRoutes');
const projectTaskFilesRouter = require('./project-management/projectTaskFilesRoutes');
const projectTaskStatusRouter = require('./project-management/projectTaskStatusRoutes');
const taskChecklistEntriesRouter = require('./project-management/taskChecklistEntriesRoutes');
const taskChecklistStatusRouter = require('./project-management/taskChecklistStatusRoutes');
//const taskEntriesRouter = require('./project-management/taskEntriesRoutes');
const taskRemindersRouter = require('./project-management/taskRemindersRoutes');
const taskTimersRouter = require('./project-management/taskTimersRoutes');

const newsletterEntriesRouter = require('./newsletter/newsletterEntriesRoutes');
const newsletterMessagesRouter = require('./newsletter/newsletterMessagesRoutes');

const addressRouter = require('./sales-finance/addressRoutes');
const deliveryNoteRouter = require('./sales-finance/deliveryNoteRoutes');
const packingListRouter = require('./sales-finance/packingListRoutes');
//const perfomaInvoiceRouter = require('./sales-finance/perfomaInvoiceRoutes');
const quotationRouter = require('./sales-finance/quotationRoutes');
const taxInvoiceRouter = require('./sales-finance/taxInvoiceRoutes');

const ratingAttributeGroupsRouter = require('./ratings/ratingAttributeGroupsRoutes');
const ratingAttributeRouter = require('./ratings/ratingAttributeRoutes');
const ratingEntriesRouter = require('./ratings/ratingEntriesRoutes');

const ecommerceAddressRouter = require('./ecommerce/ecommerceAddressRoutes');
const ecommerceLocationsRouter = require('./ecommerce/ecommerceLocationsRoutes');
const ecommerceProductsRouter = require('./ecommerce/ecommerceProductsRoutes');
const ecommerceOrderRouter = require('./ecommerce/ecommerceOrderRoutes');
const ecommerceStockRouter = require('./ecommerce/ecommerceStockRoutes');

const commentEntriesRouter = require('./comments/commentEntriesRoutes');

const eventEntriesRouter = require('./events/eventEntriesRoutes');

const contractEntriesRouter = require('./contract/contractEntriesRoutes');
const contractTemplatesRouter = require('./contract/contractTemplatesRoutes');

const ticketCategoriesRouter = require('./ticket-support/ticketCategoriesRoutes');
const ticketEntriesRouter = require('./ticket-support/ticketEntriesRoutes');
const ticketProductsRouter = require('./ticket-support/ticketProductsRoutes');
const ticketResponseRouter = require('./ticket-support/ticketResponseRoutes');

const directoryAttributesRouter = require('./directory/directoryAttributesGroupsRoutes');
const directoryCategoriesRouter = require('./directory/directoryCategoriesRoutes');
const directoryEntriesRouter = require('./directory/directoryEntriesRoutes');
const directoryLevelsRouter = require('./directory/directoryLevelsRoutes');
const directoryRouter = require('./directory/directoryRoutes');

const menuRouter = require('./menu/menuRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in API V1 ROUTES');
  next();
});
/* ROUTES */

// EXAMPLE
router.use('/example', exampleRouter);

// USERS MODULE
router.use('/users', userRouter);

// ANNOUNCEMENT
router.use('/announcement-entries', announcementEntriesRouter);
router.use('/announcement-notify', announcementNotifyRouter);

// RATINGS MODULE
router.use('/ratingAttributeGroups', ratingAttributeGroupsRouter);
router.use('/ratingAttribute', ratingAttributeRouter);
router.use('/ratingEntries', ratingEntriesRouter);

// TICKETS & SUPPORT MODULE
router.use('/ticketCategories', ticketCategoriesRouter);
router.use('/ticketEntries', ticketEntriesRouter);
router.use('/ticketProducts', ticketProductsRouter);
router.use('/ticketResponse', ticketResponseRouter);

// NEWSLETTER MODULE
router.use('/newsletter-entries', newsletterEntriesRouter);
router.use('/newsletter-messages', newsletterMessagesRouter);

// SALES-FINANCE MODULE
router.use('/address', addressRouter);
router.use('/delivery-note', deliveryNoteRouter);
router.use('/packing-list', packingListRouter);
//router.use('/perfoma-invoice', perfomaInvoiceRouter);
router.use('/quotation', quotationRouter);
router.use('/tax-invoice', taxInvoiceRouter);

// OTHER MODULE
router.use('/analytics', analyticsRouter);
router.use('/charts', chartsRouter);
router.use('/forms', formsRouter);
router.use('/pages', pagesRouter);
router.use('/reports', reportsRouter);

// LEADS MODULE
router.use('/lead-entries', leadEntriesRouter);
router.use('/lead-response', leadResponseRouter);
router.use('/lead-categories', leadCategoriesRouter);

// Farm MODULE
router.use('/farm-entries', farmEntriesRouter);
router.use('/farm-exported-strategy', farmExportedStrategyRouter);
router.use('/farm-regions', farmRegionsRouter);
router.use('/farm-strategy', farmStrategyRouter);
router.use('/form-response', formResponseRouter);

router.use('/milestone', milestoneRouter);

// PROJECT MODULE
router.use('/project-activity', projectActivityRouter);
router.use('/project-admins', projectAdminsRouter);
router.use('/project-discussion-comments', projectDiscussionCommentsRouter);
router.use('/project-discussions', projectDiscussionsRouter);
router.use('/project-entries', projectEntriesRouter);
router.use('/project-files', projectFilesRouter);
router.use('/project-members', projectMembersRouter);
router.use('/project-notes', projectNotesRouter);
router.use('/project-task-files', projectTaskFilesRouter);
router.use('/project-task-status', projectTaskStatusRouter);
router.use('/task-checklist-entries', taskChecklistEntriesRouter);
router.use('/task-checklist-status', taskChecklistStatusRouter);
//router.use('/task-entries',taskEntriesRouter);
router.use('/task-reminders', taskRemindersRouter);
router.use('/task-timers', taskTimersRouter);

// COMMENTS MODULE
router.use('/commentEntries', commentEntriesRouter);

// ECOMMERCE MODULE
router.use('/ecommerce-address', ecommerceAddressRouter);
router.use('/ecommerce-locations', ecommerceLocationsRouter);
router.use('/ecommerce-order', ecommerceOrderRouter);
router.use('/ecommerce-products', ecommerceProductsRouter);
router.use('/ecommerce-stock', ecommerceStockRouter);

// DIRECTORY MODULE
router.use('/directoryAttributes', directoryAttributesRouter);
router.use('/directoryCategories', directoryCategoriesRouter);
router.use('/directoryEntries', directoryEntriesRouter);
router.use('/directoryLevels', directoryLevelsRouter);
router.use('/directory', directoryRouter);

// EVENTS MODULE
router.use('/eventEntries', eventEntriesRouter);

// CONTRACT MODULE
router.use('/contractEntries', contractEntriesRouter);
router.use('/contractTemplates', contractTemplatesRouter);

// MENU MODULE
router.use('/menu', menuRouter);

module.exports = router;
