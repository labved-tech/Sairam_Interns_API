/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/user/authController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in VIEW PAGES ROUTER');
  next();
});

/* ROUTES */
router.get('/test', viewsController.getTest);
router.get('/overview', authController.protect, viewsController.getOverview);

// EXAMPLE RELATED ROUTES
router.get('/menu/manager', viewsController.getMenuManager);
router.get('/menu/section', viewsController.getMenuSection);
router.get('/menu/items', viewsController.getMenuItems);
router.get('/menu/subitems1', viewsController.getMenuSubItems1);
router.get('/menu/subitems2', viewsController.getMenuSubItems2);

// EXAMPLE RELATED ROUTES
router.get('/standardForm', viewsController.getForm);
router.get('/example', viewsController.getExample);
router.get('/localtable', viewsController.getLocalTable);
router.get('/remotetable', viewsController.getRemoteTable);

// LOGIN RELATED ROUTES
router.get('/signup', viewsController.getSignUp);
router.get('/login', viewsController.getLoginForm);
router.get('/forgotpassword', viewsController.getForgot);
router.get('/error', viewsController.getError);

// USERS RELATED ROUTES
router.get('/account-settings/users/view-all', viewsController.getAllUser);
router.get('/account-settings/users/add-new', viewsController.getAddUser);

// ANNOUNCEMENT RELATED ROUTES
router.get('/announcement/entries', viewsController.announcementEntries);
router.get('/announcement/notification', viewsController.announcementNotify);
router.get(
  '/announcement/entries/table',
  viewsController.announcementEntriesTable
);
router.get(
  '/announcement/notify/table',
  viewsController.announcementNotifyTable
);

// RATING RELATED ROUTES
router.get('/ratings/attribute/groups', viewsController.ratingAttributeGroups);
router.get('/ratings/attribute', viewsController.ratingAttribute);
router.get('/ratings/entries', viewsController.ratingEntries);
router.get('/ratings/attribute/table', viewsController.ratingAttributeTable);
router.get(
  '/ratings/attribute/groups/table',
  viewsController.ratingAttributeGroupsTable
);
router.get('/ratings/entries/table', viewsController.ratingEntriesTable);

// ANALYTICS RELATED ROUTES
router.get('/analytics', viewsController.analytics);
router.get('/analytics/table', viewsController.analyticsTable);

// CHARTS RELATED ROUTES
router.get('/charts', viewsController.charts);
router.get('/charts/table', viewsController.chartsTable);

// NEWSLETTER RELATED ROUTES
router.get('/newsletter/messages', viewsController.newsletterMessages);
router.get('/newsletter/entries', viewsController.newsletterEntries);
router.get('/newsletter/entries/table', viewsController.newsletterEntriesTable);
router.get(
  '/newsletter/messages/table',
  viewsController.newsletterMessagesTable
);

// SALES AND FINANCE RELATED ROUTES
router.get('/sales-finance/address', viewsController.address);
router.get('/sales-finance/deliveryNote', viewsController.deliveryNote);
router.get('/sales-finance/packingList', viewsController.packingList);
router.get('/sales-finance/quotation', viewsController.quotation);
router.get('/sales-finance/taxInvoice', viewsController.taxInvoice);
router.get('/sales-finance/performaInvoice', viewsController.performaInvoice);

// EVENT RELATED ROUTES
router.get('/event/entries', viewsController.eventEntries);

// COMMENTS RELATED ROUTES
router.get('/comment/entries', viewsController.commentEntries);

// CONTRACT RELATED ROUTES
router.get('/contract/entries', viewsController.contractEntries);
router.get('/contract/templates', viewsController.contractTemplates);

// TICKET AND SUPPORTS RELATED ROUTES
router.get('/ticket-support/categories', viewsController.ticketCategories);
router.get('/ticket-support/entries', viewsController.ticketEntries);
router.get('/ticket-support/Products', viewsController.ticketProducts);
router.get('/ticket-support/Response', viewsController.ticketResponse);

// LEADS RELATED ROUTES
router.get('/lead/categories', viewsController.leadCategories);
router.get('/lead/entries', viewsController.leadEntries);
router.get('/lead/response', viewsController.leadResponse);
router.get('/lead/categories/table', viewsController.leadCategoriesTable);
router.get('/lead/response/table', viewsController.leadResponseTable);
router.get('/lead/entries/table', viewsController.leadEntriesTable);

// DIRECTORY RELATED ROUTES
router.get(
  '/directory/attributes/groups',
  viewsController.directoryAttributesGroups
);
router.get('/directory/categories', viewsController.directoryCategories);
router.get('/directory/levels', viewsController.directoryLevels);
router.get('/directory/entries', viewsController.directoryEntries);
router.get('/directory', viewsController.directory);
// router.get(
//   '/directory/categories/table',
//   viewsController.ratingCategoriesTable
// );
// router.get(
//   '/directory/attributes/groups/table',
//   viewsController.directoryAttributesGroupsTable
// );
router.get('/directory/levels/table', viewsController.directoryLevelsTable);
router.get('/directory/entries/table', viewsController.directoryEntriesTable);
router.get('/directory/table', viewsController.directoryTable);

// PAGES RELATED ROUTES
router.get('/pages', viewsController.pages);
router.get('/pages/table', viewsController.pagesTable);

// FORMS RELATED ROUTES
router.get('/form-response', viewsController.formResponse);
router.get('/forms', viewsController.forms);
router.get('/form-response/table', viewsController.formResponseTable);
router.get('/forms/table', viewsController.formsTable);

// REPORTS RELATED ROUTES
router.get('/reports', viewsController.reports);
router.get('/reports/table', viewsController.reportsTable);

// PRECISION AGRICULTURES RELATED ROUTES
router.get('/farm/entries/', viewsController.farmEntries);
router.get('/farm/exported-strategy/', viewsController.farmExportedStrategy);
router.get('/farm/regions/', viewsController.farmRegions);
router.get('/farm/strategy/', viewsController.farmStrategy);
router.get('/farm/entries/table', viewsController.farmEntriesTable);
router.get(
  '/farm/exported-strategy/table',
  viewsController.farmExportedStrategyTable
);
router.get('/farm/regions/table', viewsController.farmRegionsTable);
router.get('/farm/strategy/table', viewsController.farmStrategyTable);

// ECOMMERCE RELATED ROUTES
router.get('/ecommerce/address/', viewsController.ecommerceAddress);
router.get('/ecommerce/locations/', viewsController.ecommerceLocations);
router.get('/ecommerce/stock/', viewsController.ecommerceStock);
router.get('/ecommerce/order/', viewsController.ecommerceOrder);
router.get('/ecommerce/products/', viewsController.ecommerceProducts);
router.get('/ecommerce/address/table', viewsController.ecommerceAddressTable);
router.get(
  '/ecommerce/locations/table',
  viewsController.ecommerceLocationsTable
);
router.get('/ecommerce/stock/table', viewsController.ecommerceStockTable);
router.get('/ecommerce/order/table', viewsController.ecommerceOrderTable);
router.get('/ecommerce/products/table', viewsController.ecommerceProductsTable);

module.exports = router;
