/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();

// EXAMPLE
const exampleRouter = require('./example/exampleRoutes');
const userRouter = require('./user/userRoutes');
const analyticsRouter = require('./analytics/analyticsRoutes');
const chartsRouter = require('./charts/chartsRoutes');
const pagesRouter = require('./pages/pagesRoutes');
const reportsRouter = require('./reports/reportsRoutes');

// FORMS
const formResponseRouter = require('./forms/formResponseRoutes');
const formsRouter = require('./forms/formsRoutes');

// ANNOUNCEMENTS
const announcementRouter = require('./announcement/announcementRoutes');

// LEADS
const leadsRouter = require('./leads/leadsRoutes');

// PRECISION AGRICULTURE
const precisionAgricultureRouter = require('./precision-agriculture/precisionAgricultureRoutes');

// PROJECT MANAGEMENT
const projectManagementRouter = require('./project-management/projectManagementRoutes');

// NEWSLETTER
const newsletterRouter = require('./newsletter/newsletterRoutes');

// SALES AND FINANCE
const salesFinanceRouter = require('./sales-finance/salesFinanceRoutes');

// RATINGS
const ratingsRouter = require('./ratings/ratingsRoutes');

// ECOMMERCE
const ecommerceRouter = require('./ecommerce/ecommerceRoutes');

// COMMENTS
const commentEntriesRouter = require('./comments/commentEntriesRoutes');

// EVENTS
const eventEntriesRouter = require('./events/eventEntriesRoutes');

// CONTRACT
const contractRouter = require('./contract/contractRoutes');

// TICKETS & SUPPORT
const ticketSupportRouter = require('./ticket-support/ticketSupportRoutes');

// DIRECTORY
const directoryAttributesRouter = require('./directory/directoryAttributesGroupsRoutes');
const directoryCategoriesRouter = require('./directory/directoryCategoriesRoutes');
const directoryEntriesRouter = require('./directory/directoryEntriesRoutes');
const directoryLevelsRouter = require('./directory/directoryLevelsRoutes');
const directoryRouter = require('./directory/directoryRoutes');

// MENU
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
router.use('/announcement', announcementRouter);

// RATINGS MODULE
router.use('/ratings', ratingsRouter);

// TICKETS & SUPPORT MODULE
router.use('/ticket-support', ticketSupportRouter);

// NEWSLETTER MODULE
router.use('/newsletter', newsletterRouter);

// SALES-FINANCE MODULE
router.use('/sales-finance', salesFinanceRouter);

// OTHER MODULE
router.use('/analytics', analyticsRouter);
router.use('/charts', chartsRouter);
router.use('/forms', formsRouter);
router.use('/form-response', formResponseRouter);
router.use('/pages', pagesRouter);
router.use('/reports', reportsRouter);

// LEADS MODULE
router.use('/lead', leadsRouter);

// PRECISION AGRICULTURE MODULE
router.use('/farm', precisionAgricultureRouter);

// PROJECT MODULE
router.use('/project', projectManagementRouter);

// COMMENTS MODULE
router.use('/comment/entries', commentEntriesRouter);

// ECOMMERCE MODULE
router.use('/ecommerce', ecommerceRouter);

// DIRECTORY MODULE
router.use('/directoryAttributes', directoryAttributesRouter);
router.use('/directoryCategories', directoryCategoriesRouter);
router.use('/directoryEntries', directoryEntriesRouter);
router.use('/directoryLevels', directoryLevelsRouter);
router.use('/directory', directoryRouter);

// EVENTS MODULE
router.use('/event/entries', eventEntriesRouter);

// CONTRACT MODULE
router.use('/contracts', contractRouter);

// MENU MODULE
router.use('/menu', menuRouter);

module.exports = router;
