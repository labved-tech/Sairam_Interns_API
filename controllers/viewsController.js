/* DEPENDENCIES */

/* MIDDLEWARES */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const MenuManager = require('../models/menu/menuManagerModel');
const MenuSection = require('../models/menu/menuSectionModel');
const MenuItems = require('../models/menu/menuItemsModel');
const MenuSubItems1 = require('../models/menu/menuSubItems1Model');
const MenuSubItems2 = require('../models/menu/menuSubItems2Model');

// STANDARD FORM RELATED CONTROLLER
exports.getTest = (req, res) => {
  console.log('We are in Standard Form');
  res.status(200).render(`./../views/pages/example/test`);
};

/* MENU */
// MANAGER
exports.getMenuManager = (req, res) => {
  console.log('We are in Menu Manager');

  res.status(200).render('./pages/overview');
};
// SECTION
exports.getMenuSection = (req, res) => {
  console.log('We are in Menu Section');

  res.status(200).render('./pages/overview');
};
// ITEMS
exports.getMenuItems = (req, res) => {
  console.log('We are in Menu Items');

  res.status(200).render('./pages/overview');
};
// SUB-ITEMS1
exports.getMenuSubItems1 = (req, res) => {
  console.log('We are in Menu sub items 1');

  res.status(200).render('./pages/overview');
};
// SUB-ITEMS2
exports.getMenuSubItems2 = (req, res) => {
  console.log('We are in Menu sub items 2');

  res.status(200).render('./pages/overview');
};

// OVERVIEW RELATED CONTROLLER
exports.getOverview = (req, res) => {
  console.log('We are in viewsController');

  res.status(200).render('./pages/overview');
};

// EXAMPLE RELATED CONTROLLER
exports.getExample = (req, res) => {
  console.log('We are in Example Page');

  res.status(200).render('./../views/pages/example/example');
};

// LOGIN RELATED CONTROLLER
exports.getSignUp = (req, res) => {
  console.log('We are in Sign-Up Page');

  res.status(200).render('./pages/users/signUp', {
    title: `Sign-Up`,
  });
};
exports.getLoginForm = (req, res) => {
  console.log('We are in Login Page');

  res.status(200).render('./pages/users/login', {
    title: 'Sign-In',
  });
};
exports.getForgot = (req, res) => {
  console.log('We are in Forgot Password Page');

  res.status(200).render('./pages/users/forgotPassword');
};
exports.getError = (req, res) => {
  console.log('We are in Error Page');

  res.status(200).render('./pages/error');
};

// USERS RELATED CONTROLLER
exports.getAllUser = (req, res) => {
  console.log('We are in All Users Page');

  res.status(200).render('./../views/pages/users/all-users');
};
exports.getAddUser = (req, res) => {
  console.log('We are in Add Users Page');
  res.status(200).render(`./../views/pages/users/add-user`);
};

// STANDARD FORM RELATED CONTROLLER
exports.getForm = (req, res) => {
  console.log('We are in Standard Form');
  res.status(200).render(`./../views/pages/example/form`);
};

// TABLE RELATED CONTROLLER
exports.getLocalTable = (req, res) => {
  console.log('We are in Tables Page');
  res.status(200).render(`./../views/pages/example/local-table`);
};
exports.getRemoteTable = (req, res) => {
  console.log('We are in Tables Page');
  res.status(200).render(`./../views/pages/example/remote-table`);
};
// ANNOUNCEMENT RELATED CONTROLLER
exports.announcementEntries = (req, res) => {
  console.log('We are in Announcement Entries Form Page');
  res.status(200).render('./../views/pages/announcement/announcementEntries');
};
exports.announcementEntriesTable = (req, res) => {
  console.log('We are in Announcement Entries Table Page');
  res
    .status(200)
    .render('./../views/pages/announcement/announcementEntriesTable');
};

exports.announcementNotifyTable = (req, res) => {
  console.log('We are in Announcement Notifications Table Page');
  res
    .status(200)
    .render('./../views/pages/announcement/announcementNotifyTable');
};

exports.announcementNotify = (req, res) => {
  console.log('We are in Announcement Notifications Form Page');
  res.status(200).render('./../views/pages/announcement/announcementNotify');
};

// ANALYTICS RELATED CONTROLLER
exports.analytics = (req, res) => {
  console.log('We are in Analytics Form Page');
  res.status(200).render('./../views/pages/analytics/analytics');
};

// ANALYTICS TABLE RELATED CONTROLLER
exports.analyticsTable = (req, res) => {
  console.log('We are in Analytics Tables Page');
  res.status(200).render(`./../views/pages/analytics/analyticsTable`);
};

// NEWSLETTER RELATED CONTROLLER
exports.newsletterMessages = (req, res) => {
  console.log('We are in Newsletter Messages Form Page');
  res.status(200).render('./../views/pages/newsletter/newsletterMessages');
};

exports.newsletterEntries = (req, res) => {
  console.log('We are in Newsletter Entries Form Page');
  res.status(200).render('./../views/pages/newsletter/newsletterEntries');
};

exports.newsletterEntriesTable = (req, res) => {
  console.log('We are in Newsletter Entries Table Page');
  res.status(200).render('./../views/pages/newsletter/newsletterEntriesTable');
};
exports.newsletterMessagesTable = (req, res) => {
  console.log('We are in Newsletter Messages Table Page');
  res.status(200).render('./../views/pages/newsletter/newsletterMessagesTable');
};

// RATING RELATED CONTROLLER
exports.ratingAttributeGroups = (req, res) => {
  console.log('We are in Rating AttributeGroups Form Page');
  res.status(200).render('./../views/pages/rating/ratingAttributeGroups');
};

exports.ratingAttribute = (req, res) => {
  console.log('We are in Rating Attribute Form Page');
  res.status(200).render('./../views/pages/rating/ratingAttribute');
};

exports.ratingEntries = (req, res) => {
  console.log('We are in Rating Entries Form Page');
  res.status(200).render('./../views/pages/rating/ratingEntries');
};

// RATING TABLE RELATED CONTROLLER
exports.ratingAttributeTable = (req, res) => {
  console.log('We are in Rating Attribute Table Page');
  res.status(200).render('./../views/pages/rating/ratingAttributeTable');
};

exports.ratingAttributeGroupsTable = (req, res) => {
  console.log('We are in Rating Attribute Groups Table Page');
  res.status(200).render('./../views/pages/rating/ratingAttributeGroupsTable');
};

exports.ratingEntriesTable = (req, res) => {
  console.log('We are in Rating Entries Table Page');
  res.status(200).render('./../views/pages/rating/ratingEntriesTable');
};

// EVENT RELATED CONTROLLER
exports.eventEntries = (req, res) => {
  console.log('We are in event Entries Form Page');
  res.status(200).render('./../views/pages/event/eventEntries');
};

// EVENT RELATED CONTROLLER
exports.eventEntriesTable = (req, res) => {
  console.log('We are in event Entries Table  Page');
  res.status(200).render('./../views/pages/event/eventEntriesTable', doc);
};

// LEADS RELATED CONTROLLER
exports.leadCategories = (req, res) => {
  console.log('We are in Lead Categories Form Page');
  res.status(200).render('./../views/pages/leads/leadCategories');
};

exports.leadResponse = (req, res) => {
  console.log('We are in Lead Response Form Page');
  res.status(200).render('./../views/pages/leads/leadResponse');
};

exports.leadEntries = (req, res) => {
  console.log('We are in Lead Entries Form Page');
  res.status(200).render('./../views/pages/leads/leadEntries');
};

// LEADS TABLE RELATED CONTROLLER
exports.leadCategoriesTable = (req, res) => {
  console.log('We are in Lead Categories Tables Page');
  res.status(200).render(`./../views/pages/leads/leadCategoriesTable`);
};

exports.leadResponseTable = (req, res) => {
  console.log('We are in Lead Response Tables Page');
  res.status(200).render(`./../views/pages/leads/leadResponseTable`);
};

exports.leadEntriesTable = (req, res) => {
  console.log('We are in Lead Entries Tables Page');
  res.status(200).render(`./../views/pages/leads/leadEntriesTable`);
};

// SALES AND FINANCE RELATED CONTROLLER
exports.address = (req, res) => {
  console.log('We are in address Form Page');
  res.status(200).render('./../views/pages/sales-finance/address');
};

exports.deliveryNote = (req, res) => {
  console.log('We are in Delivery Note Form Page');
  res.status(200).render('./../views/pages/sales-finance/deliveryNote');
};

exports.packingList = (req, res) => {
  console.log('We are in Packing List Form Page');
  res.status(200).render('./../views/pages/sales-finance/packingList');
};

exports.quotation = (req, res) => {
  console.log('We are in Quotation Form Page');
  res.status(200).render('./../views/pages/sales-finance/quotation');
};

exports.taxInvoice = (req, res) => {
  console.log('We are in Tax Invoice Form Page');
  res.status(200).render('./../views/pages/sales-finance/taxInvoice');
};

exports.performaInvoice = (req, res) => {
  console.log('We are in Performa Invoice Form Page');
  res.status(200).render('./../views/pages/sales-finance/performaInvoice');
};

exports.addressTable = (req, res) => {
  console.log('We are in Address Table Page');
  res.status(200).render('./../views/pages/sales-finance/addressTable');
};

exports.deliveryNoteTable = (req, res) => {
  console.log('We are in Delivery Note Table Page');
  res.status(200).render('./../views/pages/sales-finance/deliveryNoteTable');
};
exports.packingListTable = (req, res) => {
  console.log('We are in Packing List Table Page');
  res.status(200).render('./../views/pages/sales-finance/packingListTable');
};

exports.quotationTable = (req, res) => {
  console.log('We are in Quotation Table Page');
  res.status(200).render('./../views/pages/sales-finance/quotationTable');
};

exports.taxInvoiceTable = (req, res) => {
  console.log('We are in Tax Invoice Table Page');
  res.status(200).render('./../views/pages/sales-finance/taxInvoiceTable');
};

exports.performaInvoiceTable = (req, res) => {
  console.log('We are in Performa Invoice Table Page');
  res.status(200).render('./../views/pages/sales-finance/performaInvoiceTable');
};
// COMMENTS RELATED CONTROLLER
exports.commentEntries = (req, res) => {
  console.log('We are in comment Entries Form Page');
  res.status(200).render('./../views/pages/comments/commentEntries');
};

// COMMENTS TABLE RELATED CONTROLLER
exports.commentEntriesTable = (req, res) => {
  console.log('We are in comment Entries Table Page');
  res.status(200).render('./../views/pages/comments/commentEntriesTable', doc);
};

// CONTRACT RELATED CONTROLLER
exports.contractEntries = (req, res) => {
  console.log('We are in contract Entries Form Page');
  res.status(200).render('./../views/pages/contract/contractEntries');
};
exports.contractTemplates = (req, res) => {
  console.log('We are in contract Templates Form Page');
  res.status(200).render('./../views/pages/contract/contractTemplates');
};
// TICKET AND SUPPORTS RELATED CONTROLLER
exports.ticketCategories = (req, res) => {
  console.log('We are in ticketCategories Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketCategories');
};
exports.ticketProducts = (req, res) => {
  console.log('We are in ticketProducts Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketProducts');
};
exports.ticketEntries = (req, res) => {
  console.log('We are in ticketEntries Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketEntries');
};
exports.ticketProducts = (req, res) => {
  console.log('We are in ticketProducts Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketProducts');
};
exports.ticketResponse = (req, res) => {
  console.log('We are in ticketResponse  Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketResponse');
};

// DIRECTORY RELATED CONTROLLER
exports.directoryAttributesGroups = (req, res) => {
  console.log('We are in directory Attributes Groups Form Page');
  res
    .status(200)
    .render('./../views/pages/directory/directoryAttributesGroups');
};

exports.directoryCategories = (req, res) => {
  console.log('We are in directory Categories Form Page');
  res.status(200).render('./../views/pages/directory/directoryCategories');
};

exports.directoryLevels = (req, res) => {
  console.log('We are in directory Levels Form Page');
  res.status(200).render('./../views/pages/directory/directoryLevels');
};

exports.directoryEntries = (req, res) => {
  console.log('We are in directory Entries Form Page');
  res.status(200).render('./../views/pages/directory/directoryEntries');
};

exports.directory = (req, res) => {
  console.log('We are in directory Form Page');
  res.status(200).render('./../views/pages/directory/directory');
};

// DIRECTORY TABLE RELATED CONTROLLER

exports.directoryAttributeGroupsTable = (req, res) => {
  console.log('We are in Directory Attribute Groups Tables Page');
  res
    .status(200)
    .render(`./../views/pages/directory/directoryAttributeGroupsTable`);
};

exports.directoryCategoriesTable = (req, res) => {
  console.log('We are in Directory Categories Tables Page');
  res.status(200).render(`./../views/pages/directory/directoryCategoriesTable`);
};

exports.directoryLevelsTable = (req, res) => {
  console.log('We are in Directory Levels Tables Page');
  res.status(200).render(`./../views/pages/directory/directoryLevelsTable`);
};

exports.directoryEntriesTable = (req, res) => {
  console.log('We are in directory Entries Tables Form Page');
  res.status(200).render('./../views/pages/directory/directoryEntriesTable');
};

exports.directoryTable = (req, res) => {
  console.log('We are in directory Table Form Page');
  res.status(200).render('./../views/pages/directory/directoryTable');
};

exports.deliveryNote = (req, res) => {
  console.log('We are in Delivery Note Form Page');
  res.status(200).render('./../views/pages/sales-finance/deliveryNote');
};

// Pages RELATED CONTROLLER
exports.pages = (req, res) => {
  console.log('We are in Pages Form Page');
  res.status(200).render('./../views/pages/pages/pages');
};
// PAGES TABLE RELATED CONTROLLER
exports.pagesTable = (req, res) => {
  console.log('We are in Pages Tables Page');
  res.status(200).render(`./../views/pages/pages/pagesTable`);
};

// CHARTS RELATED CONTROLLER
exports.charts = (req, res) => {
  console.log('We are in Charts Form Page');
  res.status(200).render('./../views/pages/charts/charts');
};

// CHARTS TABLE RELATED CONTROLLER
exports.chartsTable = (req, res) => {
  console.log('We are in charts Tables Page');
  res.status(200).render(`./../views/pages/charts/chartsTable`);
};

// FORMS RELATED CONTROLLER
exports.formResponse = (req, res) => {
  console.log('We are in Form Response Page');
  res.status(200).render('./../views/pages/forms/formResponse');
};

exports.forms = (req, res) => {
  console.log('We are in Forms Page');
  res.status(200).render('./../views/pages/forms/forms');
};

// FORMS TABLE RELATED CONTROLLER
exports.formResponseTable = (req, res) => {
  console.log('We are in Form Response Tables Page');
  res.status(200).render(`./../views/pages/forms/formResponseTable`);
};

exports.formsTable = (req, res) => {
  console.log('We are in Forms Table Page');
  res.status(200).render(`./../views/pages/forms/formsTable`);
};

// REPORTS RELATED CONTROLLER
exports.reports = (req, res) => {
  console.log('We are in Reports Form Page');
  res.status(200).render('./../views/pages/reports/reports');
};

// REPORTS TABLE RELATED CONTROLLER
exports.reportsTable = (req, res) => {
  console.log('We are in Reports Tables Page');
  res.status(200).render(`./../views/pages/reports/reportsTable`);
};

// PRECISION AGRICULTURE RELATED CONTROLLER
exports.farmEntries = (req, res) => {
  console.log('We are in Farm Entries Form Page');
  res.status(200).render('./../views/pages/precision-agriculture/farmEntries');
};

exports.farmExportedStrategy = (req, res) => {
  console.log('We are in Farm Exported Strategy Form Page');
  res
    .status(200)
    .render('./../views/pages/precision-agriculture/farmExportedStrategy');
};

exports.farmRegions = (req, res) => {
  console.log('We are in Farm Regions Form Page');
  res.status(200).render('./../views/pages/precision-agriculture/farmRegions');
};

exports.farmStrategy = (req, res) => {
  console.log('We are in Farm Strategy Form Page');
  res.status(200).render('./../views/pages/precision-agriculture/farmStrategy');
};

// REPORTS TABLE RELATED CONTROLLER
exports.farmEntriesTable = (req, res) => {
  console.log('We are in Farm Entries Tables Page');
  res
    .status(200)
    .render(`./../views/pages/precision-agriculture/farmEntriesTable`);
};

exports.farmExportedStrategyTable = (req, res) => {
  console.log('We are in Farm Exported Strategy Tables Page');
  res
    .status(200)
    .render(
      `./../views/pages/precision-agriculture/farmExportedStrategyTable`,
      doc
    );
};

exports.farmRegionsTable = (req, res) => {
  console.log('We are in Farm Regions Tables Page');
  res
    .status(200)
    .render(`./../views/pages/precision-agriculture/farmRegionsTable`);
};

exports.farmStrategyTable = (req, res) => {
  console.log('We are in Farm Strategy Tables Page');
  res
    .status(200)
    .render(`./../views/pages/precision-agriculture/farmStrategyTable`);
};

// ECOMMERCE RELATED CONTROLLER
exports.ecommerceAddress = (req, res) => {
  console.log('We are in Ecommerce Address Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceAddress');
};

exports.ecommerceLocations = (req, res) => {
  console.log('We are in Ecommerce Location Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceLocations');
};

exports.ecommerceStock = (req, res) => {
  console.log('We are in Ecommerce Stock Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceStock');
};

exports.ecommerceOrder = (req, res) => {
  console.log('We are in Ecommerce Order Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceOrder');
};

exports.ecommerceProducts = (req, res) => {
  console.log('We are in Ecommerce Order Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceProducts');
};

exports.ecommerceAddressTable = (req, res) => {
  console.log('We are in Ecommerce Address Tables Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceAddressTable');
};

exports.ecommerceLocationsTable = (req, res) => {
  console.log('We are in Ecommerce Location Tables Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceLocationsTable');
};

exports.ecommerceStockTable = (req, res) => {
  console.log('We are in Ecommerce Tables Stock Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceStockTable');
};

exports.ecommerceOrderTable = (req, res) => {
  console.log('We are in Ecommerce Order Tables Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceOrderTable');
};

exports.ecommerceProductsTable = (req, res) => {
  console.log('We are in Ecommerce Order Tables Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceProductsTable');
};
