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

// MENU
router.get('/menu/manager', viewsController.getMenuManagerForm);
router.get('/menu/section', viewsController.getMenuSectionForm);
router.get('/menu/items', viewsController.getMenuItemsForm);
router.get('/menu/subitems1', viewsController.getMenuSubItems1Form);
router.get('/menu/subitems2', viewsController.getMenuSubItems2Form);

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
router.get(
  '/announcement/entries/table',
  viewsController.announcementEntriesTable
);
router.get('/announcement/entries/all', viewsController.announcementEntriesAll);
router.get('/announcement/notification', viewsController.announcementNotify);
router.get(
  '/announcement/notification/table',
  viewsController.announcementNotifyTable
);
router.get(
  '/announcement/notification/all',
  viewsController.announcementNotificationAll
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
router.get(
  '/ratings/attribute/groups/table',
  viewsController.ratingAttributeGroupsTable
);
router.get('/ratings/entries/table', viewsController.ratingEntriesTable);
router.get(
  '/rating/attribute/groups/all',
  viewsController.ratingAttributeGroupsAll
);
router.get('/rating/attribute/all', viewsController.ratingAttributeAll);

// ANALYTICS RELATED ROUTES
router.get('/analytics', viewsController.analytics);
router.get('/analytics/all', viewsController.analyticsAll);
router.get('/analytics/table', viewsController.analyticsTable);

// CHARTS RELATED ROUTES
router.get('/charts', viewsController.charts);
router.get('/charts/all', viewsController.chartsAll);
router.get('/charts/table', viewsController.chartsTable);

// NEWSLETTER RELATED ROUTES
router.get('/newsletter/messages', viewsController.newsletterMessages);
router.get('/newsletter/entries', viewsController.newsletterEntries);
router.get('/newsletter/entries/table', viewsController.newsletterEntriesTable);
router.get(
  '/newsletter/messages/table',
  viewsController.newsletterMessagesTable
);
router.get('/newsletter/messages/all', viewsController.newsletterMessagesAll);

// SALES AND FINANCE RELATED ROUTES
router.get('/sales-finance/address', viewsController.address);
router.get('/sales-finance/address/all', viewsController.addressAll);
router.get('/sales-finance/deliveryNote', viewsController.deliveryNote);
router.get('/sales-finance/deliveryNote/all', viewsController.deliveryNoteAll);

router.get('/sales-finance/packingList', viewsController.packingList);
router.get('/sales-finance/packingList/box', viewsController.packingListBox);
router.get('/sales-finance/packingList/item', viewsController.packingListItem);
router.get(
  '/sales-finance/packingList/shipping',
  viewsController.packingListShipping
);

router.get('/sales-finance/quotation', viewsController.quotation);
router.get('/sales-finance/quotation/all', viewsController.quotationAll);

router.get('/sales-finance/taxInvoice', viewsController.taxInvoice);
router.get('/sales-finance/taxInvoice/item', viewsController.taxInvoiceItem);

router.get('/sales-finance/performaInvoice', viewsController.performaInvoice);
router.get(
  '/sales-finance/performaInvoice/payment',
  viewsController.performaInvoicePayment
);
router.get(
  '/sales-finance/performaInvoice/item',
  viewsController.performaInvoiceItem
);

// SALES AND FINANCE TABLE
router.get('/sales-finance/address/table', viewsController.addressTable);
router.get(
  '/sales-finance/deliveryNote/table',
  viewsController.deliveryNoteTable
);
router.get(
  '/sales-finance/packingList/table',
  viewsController.packingListTable
);
router.get('/sales-finance/quotation/table', viewsController.quotationTable);
router.get('/sales-finance/taxInvoice/table', viewsController.taxInvoiceTable);
router.get(
  '/sales-finance/performaInvoice/table',
  viewsController.performaInvoiceTable
);

// EVENT RELATED ROUTES
router.get('/event/entries', viewsController.eventEntries);
router.get('/event/entries/table', viewsController.eventEntriesTable);
router.get('/event/entries/all', viewsController.eventEntriesAll);

// COMMENTS RELATED ROUTES
router.get('/comment/entries', viewsController.commentEntries);
router.get('/comment/entries/table', viewsController.commentEntriesTable);

// CONTRACT RELATED ROUTES
router.get('/contract/entries', viewsController.contractEntries);
router.get('/contract/templates', viewsController.contractTemplates);
router.get('/contract/entries/table', viewsController.contractEntriesTable);
router.get('/contract/templates/table', viewsController.contractTemplatesTable);

// TICKET AND SUPPORTS RELATED ROUTES
router.get('/ticket-support/categories', viewsController.ticketCategories);
router.get('/ticket-support/entries', viewsController.ticketEntries);
router.get('/ticket-support/Products', viewsController.ticketProducts);
router.get('/ticket-support/Response', viewsController.ticketResponse);

// TICKET AND SUPPORTS TABLE RELATED ROUTES
router.get(
  '/ticket-support/categories/table',
  viewsController.ticketCategoriesTable
);
router.get(
  '/ticket-support/categories/all',
  viewsController.ticketCategoriesAll
);
router.get('/ticket-support/entries/table', viewsController.ticketEntriesTable);
router.get('/ticket-support/entries/all', viewsController.ticketEntriesAll);
router.get(
  '/ticket-support/Products/table',
  viewsController.ticketProductsTable
);
router.get('/ticket-support/Products/all', viewsController.ticketProductsAll);
router.get(
  '/ticket-support/Response/table',
  viewsController.ticketResponseTable
);
router.get('/ticket-support/Response/all', viewsController.ticketResponseAll);

// LEADS RELATED ROUTES
router.get('/lead/categories', viewsController.leadCategories);
router.get('/lead/entries', viewsController.leadEntries);
router.get('/lead/response', viewsController.leadResponse);
router.get('/lead/categories/table', viewsController.leadCategoriesTable);
router.get('/lead/response/table', viewsController.leadResponseTable);
router.get('/lead/entries/table', viewsController.leadEntriesTable);
router.get('/lead/categories/all', viewsController.leadCategoriesAll);
router.get('/lead/response/all', viewsController.leadResponseAll);
// DIRECTORY RELATED ROUTES
router.get(
  '/directory/attributes/groups',
  viewsController.directoryAttributesGroups
);
router.get('/directory/categories', viewsController.directoryCategories);
router.get('/directory/levels', viewsController.directoryLevels);
router.get('/directory/entries', viewsController.directoryEntries);
router.get('/directory', viewsController.directory);
router.get(
  '/directory/categories/table',
  viewsController.directoryCategoriesTable
);
router.get(
  '/directory/attributes/groups/table',
  viewsController.directoryAttributeGroupsTable
);

router.get(
  '/directory/categories/table',
  viewsController.directoryCategoriesTable
);
router.get(
  '/directory/attributes/groups/table',
  viewsController.directoryAttributeGroupsTable
);
router.get('/directory/levels/table', viewsController.directoryLevelsTable);
router.get('/directory/entries/table', viewsController.directoryEntriesTable);
router.get('/directory/table', viewsController.directoryTable);
router.get('/directory/categories/all', viewsController.directoryCategoriesAll);
router.get('/directory/all', viewsController.directoryAll);
router.get('/directory/levels/all', viewsController.directoryLevelsAll);

// PAGES RELATED ROUTES
router.get('/pages', viewsController.pages);
router.get('/pages/all', viewsController.pagesAll);
router.get('/pages/table', viewsController.pagesTable);

// FORMS RELATED ROUTES
router.get('/form-response', viewsController.formResponse);
router.get('/forms', viewsController.forms);
router.get('/form-response/table', viewsController.formResponseTable);
router.get('/forms/table', viewsController.formsTable);
router.get('/form-response/all', viewsController.formResponseAll);
router.get('/forms/all', viewsController.formsAll);

// REPORTS RELATED ROUTES
router.get('/reports', viewsController.reports);
router.get('/reports/all', viewsController.reportsAll);
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
router.get(
  '/farm/exported-strategy/all',
  viewsController.farmExportedStrategyAll
);
router.get('/farm/regions/all', viewsController.farmRegionsAll);
// ECOMMERCE RELATED ROUTES
router.get('/ecommerce/address/', viewsController.ecommerceAddress);
router.get('/ecommerce/locations/', viewsController.ecommerceLocations);
router.get(
  '/ecommerce/locations/verify-documents',
  viewsController.ecommerceLocationsVerifyDocuments
);
router.get('/ecommerce/stock/', viewsController.ecommerceStock);
router.get('/ecommerce/stock/discount', viewsController.ecommerceStockDiscount);
router.get('/ecommerce/stock/tax', viewsController.ecommerceStockTax);
router.get('/ecommerce/order/', viewsController.ecommerceOrder);
router.get('/ecommerce/order/items', viewsController.ecommerceOrderItems);
router.get('/ecommerce/products/', viewsController.ecommerceProducts);
router.get('/ecommerce/address/table', viewsController.ecommerceAddressTable);
router.get(
  '/ecommerce/locations/table',
  viewsController.ecommerceLocationsTable
);
router.get('/ecommerce/stock/table', viewsController.ecommerceStockTable);
router.get('/ecommerce/order/table', viewsController.ecommerceOrderTable);
router.get('/ecommerce/products/table', viewsController.ecommerceProductsTable);
router.get('/ecommerce/address/all', viewsController.ecommerceAddressAll);
router.get('/ecommerce/products/all', viewsController.ecommerceProductsAll);

// PROJECT MANAGEMENT RELATED ROUTES
router.get('/project/discussions', viewsController.projectDiscussions);
router.get('/project/members', viewsController.projectMembers);
router.get('/project/task-status', viewsController.taskStatus);
router.get('/project/task-reminders', viewsController.taskReminders);

router.get('/project/discussions/all', viewsController.projectDiscussionsAll);
router.get('/project/members/all', viewsController.projectMembersAll);
router.get('/project/task-status/all', viewsController.taskStatusAll);
router.get('/project/task-reminders/all', viewsController.taskRemindersAll);

router.get('/project/entries/', viewsController.projectEntries);
router.get('/project/task-entries/', viewsController.taskEntries);
router.get('/project/activity/', viewsController.projectActivity);
router.get(
  '/project/task-checklist-entries/',
  viewsController.taskChecklistEntries
);

router.get('/project/entries/all', viewsController.projectEntriesAll);
router.get('/project/task-entries/all', viewsController.taskEntriesAll);
router.get('/project/activity/all', viewsController.projectActivityAll);
router.get(
  '/project/task-checklist-entries/all',
  viewsController.taskChecklistEntriesAll
);

router.get('/project/task-timers/', viewsController.taskTimers);
router.get('/project/task-timers/all', viewsController.taskTimersAll);
router.get('/project/notes/', viewsController.projectNotes);
router.get('/project/notes/all', viewsController.projectNotesAll);
router.get('/project/admins/', viewsController.projectAdmins);
router.get('/project/admins/all', viewsController.projectAdminsAll);
router.get('/milestone/', viewsController.milestone);
router.get('/milestone/all', viewsController.milestoneAll);

//PROJECT MANAGEMENT TABLE RELATED ROUTES
router.get(
  '/project/discussions/table',
  viewsController.projectDiscussionsTable
);
router.get('/project/members/table', viewsController.projectMembersTable);
router.get('/project/task-status/table', viewsController.taskStatusTable);
router.get('/project/task-reminders/table', viewsController.taskRemindersTable);
router.get('/project/entries/table', viewsController.projectEntriesTable);
router.get('/project/task-entries/table', viewsController.taskEntriesTable);
router.get('/project/activity/table', viewsController.projectActivityTable);
router.get(
  '/project/task-checklist-entries/table',
  viewsController.taskChecklistEntriesTable
);
router.get('/project/task-timers/table', viewsController.taskTimersTable);
router.get('/project/notes/table', viewsController.projectNotesTable);
router.get('/project/admins/table', viewsController.projectAdminsTable);
router.get('/milestone/table', viewsController.milestoneTable);

//PROJECT MANAGEMENT RELATED ROUTES
router.get(
  '/project-management/taskcheckliststatus',
  viewsController.taskcheckliststatus
);
router.get(
  '/project-management/projectTaskFiles',
  viewsController.projectTaskFiles
);
router.get('/project-management/projectFiles', viewsController.projectFiles);
router.get(
  '/project-management/projectDiscussionComments',
  viewsController.projectDiscussionComments
);

//PROJECT MANAGEMENT RELATED ROUTES
router.get(
  '/project-management/taskcheckliststatus/table',
  viewsController.taskcheckliststatusTable
);
router.get(
  '/project-management/projectTaskFiles/table',
  viewsController.projectTaskFilesTable
);
router.get(
  '/project-management/projectFiles/table',
  viewsController.projectFilesTable
);
router.get(
  '/project-management/projectDiscussionComments/table',
  viewsController.projectDiscussionCommentsTable
);

// DEVICE MANAGEMENT RELATED ROUTES
router.get(
  '/device-management/example',
  viewsController.deviceManagementExample
);

module.exports = router;
