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
exports.getMenuManagerForm = (req, res) => {
  console.log('We are in Menu Manager');

  res.status(200).render('./pages/menu/managerForm');
};
// SECTION
exports.getMenuSectionForm = (req, res) => {
  console.log('We are in Menu Section');

  res.status(200).render('./pages/menu/menuSection');
};
// ITEMS
exports.getMenuItemsForm = (req, res) => {
  console.log('We are in Menu Items');

  res.status(200).render('./pages/overview');
};
// SUB-ITEMS1
exports.getMenuSubItems1Form = (req, res) => {
  console.log('We are in Menu sub items 1');

  res.status(200).render('./pages/overview');
};
// SUB-ITEMS2
exports.getMenuSubItems2Form = (req, res) => {
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

exports.announcementEntriesAll = (req, res) => {
  console.log('We are in Announcement Entries All Page');
  res
    .status(200)
    .render('./../views/pages/announcement/announcementEntriesAll');
};
exports.announcementNotificationAll = (req, res) => {
  console.log('We are in Announcement Notification All Page');
  res
    .status(200)
    .render('./../views/pages/announcement/announcementNotificationAll');
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

// ANALYTICS PAGE RELATED CONTROLLER
exports.analyticsAll = (req, res) => {
  console.log('We are in Analytics All Page');
  res.status(200).render('./../views/pages/analytics/analyticsAll');
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

exports.newsletterMessagesAll = (req, res) => {
  console.log('We are in Newsletter Entries Form Page');
  res.status(200).render('./../views/pages/newsletter/newsletterMessagesAll');
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
// RATING ALL RELATED CONTROLLER
exports.ratingAttributeGroupsAll = (req, res) => {
  console.log('We are in Rating Attribute Groups All Page');
  res.status(200).render('./../views/pages/rating/ratingAttributeGroupsAll');
};
exports.ratingAttributeAll = (req, res) => {
  console.log('We are in Rating Attribute All Page');
  res.status(200).render('./../views/pages/rating/ratingAttributeAll');
};

// EVENT RELATED CONTROLLER
exports.eventEntries = (req, res) => {
  console.log('We are in event Entries Form Page');
  res.status(200).render('./../views/pages/event/eventEntries');
};

// EVENT RELATED CONTROLLER
exports.eventEntriesTable = (req, res) => {
  console.log('We are in event Entries Table  Page');
  res.status(200).render('./../views/pages/event/eventEntriesTable');
};
exports.eventEntriesAll = (req, res) => {
  console.log('We are in event Entries All  Page');
  res.status(200).render('./../views/pages/event/eventEntriesAll');
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

exports.leadCategoriesAll = (req, res) => {
  console.log('We are in Lead Categories All Form Page');
  res.status(200).render('./../views/pages/leads/leadCategoriesAll');
};

exports.leadResponseAll = (req, res) => {
  console.log('We are in Lead Response All Form Page');
  res.status(200).render('./../views/pages/leads/leadResponseAll');
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
//ADDRESS

exports.addressAll = (req, res) => {
  console.log('We are in Address All Page');
  res.status(200).render('./../views/pages/sales-finance/addressAll');
};

exports.address = (req, res) => {
  console.log('We are in address Form Page');
  res.status(200).render('./../views/pages/sales-finance/address');
};
exports.addressTable = (req, res) => {
  console.log('We are in Address Table Page');
  res.status(200).render('./../views/pages/sales-finance/addressTable');
};
//DELIVERY NOTE
exports.deliveryNote = (req, res) => {
  console.log('We are in Delivery Note Form Page');
  res.status(200).render('./../views/pages/sales-finance/deliveryNote');
};
exports.deliveryNoteAll = (req, res) => {
  console.log('We are in Delivery Note All Page');
  res.status(200).render('./../views/pages/sales-finance/deliveryNoteAll');
};
exports.deliveryNoteTable = (req, res) => {
  console.log('We are in Delivery Note Table Page');
  res.status(200).render('./../views/pages/sales-finance/deliveryNoteTable');
};
//PACKING LIST
exports.packingList = (req, res) => {
  console.log('We are in Packing List Form Page');
  res.status(200).render('./../views/pages/sales-finance/packingList');
};
exports.packingListBox = (req, res) => {
  console.log('We are in Packing List Box Form Page');
  res.status(200).render('./../views/pages/sales-finance/packingListBox');
};
exports.packingListItem = (req, res) => {
  console.log('We are in Packing List Item Form Page');
  res.status(200).render('./../views/pages/sales-finance/packingListItem');
};
exports.packingListShipping = (req, res) => {
  console.log('We are in Packing List Shipping Form Page');
  res.status(200).render('./../views/pages/sales-finance/packingListShipping');
};
exports.packingListTable = (req, res) => {
  console.log('We are in Packing List Table Page');
  res.status(200).render('./../views/pages/sales-finance/packingListTable');
};
//QUOTATION
exports.quotation = (req, res) => {
  console.log('We are in Quotation Form Page');
  res.status(200).render('./../views/pages/sales-finance/quotation');
};
exports.quotationAll = (req, res) => {
  console.log('We are in Quotation All Page');
  res.status(200).render('./../views/pages/sales-finance/quotationAll');
};
exports.quotationTable = (req, res) => {
  console.log('We are in Quotation Table Page');
  res.status(200).render('./../views/pages/sales-finance/quotationTable');
};
//TAX INVOICE
exports.taxInvoice = (req, res) => {
  console.log('We are in Tax Invoice Form Page');
  res.status(200).render('./../views/pages/sales-finance/taxInvoice');
};
exports.taxInvoicePayment = (req, res) => {
  console.log('We are in Tax Invoice Payment Form Page');
  res.status(200).render('./../views/pages/sales-finance/taxInvoicePayment');
};
exports.taxInvoiceItem = (req, res) => {
  console.log('We are in Tax Invoice  Item Form Page');
  res.status(200).render('./../views/pages/sales-finance/taxInvoiceItem');
};
exports.taxInvoiceTable = (req, res) => {
  console.log('We are in Tax Invoice Table Page');
  res.status(200).render('./../views/pages/sales-finance/taxInvoiceTable');
};
//PERFORMA INVOICE
exports.performaInvoice = (req, res) => {
  console.log('We are in Performa Invoice Form Page');
  res.status(200).render('./../views/pages/sales-finance/performaInvoice');
};
exports.performaInvoicePayment = (req, res) => {
  console.log('We are in Performa Invoice Payment Form Page');
  res
    .status(200)
    .render('./../views/pages/sales-finance/performaInvoicePayment');
};
exports.performaInvoiceItem = (req, res) => {
  console.log('We are in Performa Invoice  Item Form Page');
  res.status(200).render('./../views/pages/sales-finance/performaInvoiceItem');
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
  res.status(200).render('./../views/pages/comments/commentEntriesTable');
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
exports.contractTemplatesTable = (req, res) => {
  console.log('We are in Contract Templates Table Page');
  res.status(200).render('./../views/pages/contract/contractTemplatesTable');
};
exports.contractEntriesTable = (req, res) => {
  console.log('We are in contract Entries Table Page');
  res.status(200).render('./../views/pages/contract/contractEntriesTable');
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

// TICKET AND SUPPORTS  TABLE RELATED CONTROLLER
exports.ticketCategoriesTable = (req, res) => {
  console.log('We are in ticketCategories Table Page');
  res
    .status(200)
    .render('./../views/pages/ticket-support/ticketCategoriesTable');
};

exports.ticketCategoriesAll = (req, res) => {
  console.log('We are in ticketCategories All Page');
  res.status(200).render('./../views/pages/ticket-support/ticketCategoriesAll');
};

exports.ticketEntriesTable = (req, res) => {
  console.log('We are in ticketEntries Table Page');
  res.status(200).render('./../views/pages/ticket-support/ticketEntriesTable');
};
exports.ticketEntriesAll = (req, res) => {
  console.log('We are in ticketEntries All Page');
  res.status(200).render('./../views/pages/ticket-support/ticketEntriesAll');
};
exports.ticketProductsTable = (req, res) => {
  console.log('We are in ticketProducts Table Page');
  res.status(200).render('./../views/pages/ticket-support/ticketProductsTable');
};
exports.ticketProductsAll = (req, res) => {
  console.log('We are in ticketProducts All Page');
  res.status(200).render('./../views/pages/ticket-support/ticketProductsAll');
};
exports.ticketResponseTable = (req, res) => {
  console.log('We are in ticketResponse  Table Page');
  res.status(200).render('./../views/pages/ticket-support/ticketResponseTable');
};
exports.ticketResponseAll = (req, res) => {
  console.log('We are in ticketResponse All Page');
  res.status(200).render('./../views/pages/ticket-support/ticketResponseAll');
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

exports.directoryCategoriesAll = (req, res) => {
  console.log('We are in directory Categories Form Page');
  res.status(200).render('./../views/pages/directory/directoryCategoriesAll');
};
exports.directoryAll = (req, res) => {
  console.log('We are in directory Form Page');
  res.status(200).render('./../views/pages/directory/directoryAll');
};
exports.directoryLevelsAll = (req, res) => {
  console.log('We are in directory Form Page');
  res.status(200).render('./../views/pages/directory/directoryLevelsAll');
};
// DIRECTORY TABLE RELATED CONTROLLER

exports.directoryAttributeGroupsTable = (req, res) => {
  console.log('We are in Directory Attribute Groups Tables Page');
  res
    .status(200)
    .render(`./../views/pages/directory/directoryAttributesGroupsTable`);
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

// Pages ALL RELATED CONTROLLER
exports.pagesAll = (req, res) => {
  console.log('We are in Pages All Page');
  res.status(200).render('./../views/pages/pages/pagesAll');
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

// CHARTS PAGE RELATED CONTROLLER
exports.chartsAll = (req, res) => {
  console.log('We are in Charts All Page');
  res.status(200).render('./../views/pages/charts/chartsAll');
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
exports.formResponseAll = (req, res) => {
  console.log('We are in Form Response All Page');
  res.status(200).render('./../views/pages/forms/formResponseAll');
};

exports.formsAll = (req, res) => {
  console.log('We are in Forms All Page');
  res.status(200).render('./../views/pages/forms/formsAll');
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

// REPORTS PAGE RELATED CONTROLLER
exports.reportsAll = (req, res) => {
  console.log('We are in Reports All Page');
  res.status(200).render('./../views/pages/reports/reportsAll');
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

exports.farmExportedStrategyAll = (req, res) => {
  console.log('We are in Farm Exported Strategy All Page');
  res
    .status(200)
    .render('./../views/pages/precision-agriculture/farmExportedStrategyAll');
};

exports.farmRegionsAll = (req, res) => {
  console.log('We are in Farm Regions All Page');
  res
    .status(200)
    .render('./../views/pages/precision-agriculture/farmRegionsAll');
};

// PRECISION AGRICULTURE TABLE RELATED CONTROLLER
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
    .render(`./../views/pages/precision-agriculture/farmExportedStrategyTable`);
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

exports.ecommerceLocationsVerifyDocuments = (req, res) => {
  console.log('We are in Ecommerce Location : Verify Documents Form Page');
  res
    .status(200)
    .render('./../views/pages/ecommerce/ecommerceLocationsVerifyDocuments');
};

exports.ecommerceStock = (req, res) => {
  console.log('We are in Ecommerce Stock Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceStock');
};

exports.ecommerceStockDiscount = (req, res) => {
  console.log('We are in Ecommerce Stock : Discount Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceStockDiscount');
};

exports.ecommerceStockTax = (req, res) => {
  console.log('We are in Ecommerce Stock : Tax Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceStockTax');
};

exports.ecommerceOrder = (req, res) => {
  console.log('We are in Ecommerce Order Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceOrder');
};

exports.ecommerceOrderItems = (req, res) => {
  console.log('We are in Ecommerce Order : Items Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceOrderItems');
};

exports.ecommerceProducts = (req, res) => {
  console.log('We are in Ecommerce Order Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceProducts');
};

exports.ecommerceAddressTable = (req, res) => {
  console.log('We are in Ecommerce Address Tables Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceAddressTable');
};

exports.ecommerceAddressAll = (req, res) => {
  console.log('We are in Ecommerce Address All Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceAddressAll');
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

exports.ecommerceProductsAll = (req, res) => {
  console.log('We are in Ecommerce Address All Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceProductsAll');
};

// PROJECT MANAGEMENT RELATED CONTROLLER
exports.projectEntries = (req, res) => {
  console.log('We are in Project Entries Form Page');
  res.status(200).render('./../views/pages/project-management/projectEntries');
};
exports.taskEntries = (req, res) => {
  console.log('We are in Task Entries Form Page');
  res.status(200).render('./../views/pages/project-management/taskEntries');
};
exports.projectActivity = (req, res) => {
  console.log('We are in Project Activity Form Page');
  res.status(200).render('./../views/pages/project-management/projectActivity');
};
exports.taskChecklistEntries = (req, res) => {
  console.log('We are in Task Checklist Entries Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/taskChecklistEntries');
};

exports.projectEntriesAll = (req, res) => {
  console.log('We are in Project Entries All Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectEntriesAll');
};
exports.taskEntriesAll = (req, res) => {
  console.log('We are in Task Entries All Form Page');
  res.status(200).render('./../views/pages/project-management/taskEntriesAll');
};
exports.projectActivityAll = (req, res) => {
  console.log('We are in Project Activity All Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectActivityAll');
};
exports.taskChecklistEntriesAll = (req, res) => {
  console.log('We are in Task Checklist Entries All Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/taskChecklistEntriesAll');
};

exports.projectDiscussions = (req, res) => {
  console.log('We are in Project Discussions Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectDiscussions');
};
exports.taskStatus = (req, res) => {
  console.log('We are in Project Task Status Form Page');
  res.status(200).render('./../views/pages/project-management/taskStatus');
};
exports.projectMembers = (req, res) => {
  console.log('We are in Project Memebers Form Page');
  res.status(200).render('./../views/pages/project-management/projectMembers');
};
exports.taskReminders = (req, res) => {
  console.log('We are in Project Task Reminders Form Page');
  res.status(200).render('./../views/pages/project-management/taskReminders');
};

exports.projectDiscussionsAll = (req, res) => {
  console.log('We are in Project Discussions Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectDiscussionsAll');
};
exports.taskStatusAll = (req, res) => {
  console.log('We are in Project Task Status Form Page');
  res.status(200).render('./../views/pages/project-management/taskStatusAll');
};
exports.projectMembersAll = (req, res) => {
  console.log('We are in Project Memebers Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectMembersAll');
};
exports.taskRemindersAll = (req, res) => {
  console.log('We are in Project Task Reminders Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/taskRemindersAll');
};

exports.taskTimers = (req, res) => {
  console.log('We are in Project Task Timers Form Page');
  res.status(200).render('./../views/pages/project-management/taskTimers');
};
exports.taskTimersAll = (req, res) => {
  console.log('We are in Project Task Timers Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/taskTimersAll');
};
exports.projectNotes = (req, res) => {
  console.log('We are in Project Notes Form Page');
  res.status(200).render('./../views/pages/project-management/projectNotes');
};
exports.projectNotesAll = (req, res) => {
  console.log('We are in Project Notes Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectNotesAll');
};
exports.projectAdmins = (req, res) => {
  console.log('We are in Project Admins Form Page');
  res.status(200).render('./../views/pages/project-management/projectAdmins');
};
exports.projectAdminsAll = (req, res) => {
  console.log('We are in Project Admins Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectAdminsAll');
};
exports.milestone = (req, res) => {
  console.log('We are in Milesstone Form Page');
  res.status(200).render('./../views/pages/project-management/milestone');
};
exports.milestoneAll = (req, res) => {
  console.log('We are in Milestone Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/milestoneAll');
};
//PROJECT MANAGEMENT TABLE RELATED CONTROLLER
exports.projectDiscussionsTable = (req, res) => {
  console.log('We are in Project Discussions Table Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectDiscussionsTable');
};
exports.taskStatusTable = (req, res) => {
  console.log('We are in Project Task Status Table Page');
  res.status(200).render('./../views/pages/project-management/taskStatusTable');
};
exports.projectMembersTable = (req, res) => {
  console.log('We are in Project Memebers Table Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectMembersTable');
};
exports.taskRemindersTable = (req, res) => {
  console.log('We are in Project Task Reminders Table Page');
  res
    .status(200)
    .render('./../views/pages/project-management/taskRemindersTable');
};

exports.projectEntriesTable = (req, res) => {
  console.log('We are in Project Entries Tables Page');
  res
    .status(200)
    .render(`./../views/pages/project-management/projectEntriesTable`);
};
exports.taskTimersTable = (req, res) => {
  console.log('We are in Project Task Timers Table Page');
  res.status(200).render('./../views/pages/project-management/taskTimersTable');
};
exports.projectNotesTable = (req, res) => {
  console.log('We are in Project Notes Table Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectNotesTable');
};
exports.projectAdminsTable = (req, res) => {
  console.log('We are in Project Admins Table Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectAdminsTable');
};
exports.milestoneTable = (req, res) => {
  console.log('We are in Milesstone Table Page');
  res.status(200).render('./../views/pages/project-management/milestoneTable');
};

exports.projectActivityTable = (req, res) => {
  console.log('We are in Project Activity Tables Page');
  res
    .status(200)
    .render(`./../views/pages/project-management/projectActivityTable`);
};

exports.taskEntriesTable = (req, res) => {
  console.log('We are in Task Entries Tables Page');
  res
    .status(200)
    .render(`./../views/pages/project-management/taskEntriesTable`);
};

exports.taskChecklistEntriesTable = (req, res) => {
  console.log('We are in Task Checklist Entries Tables Page');
  res
    .status(200)
    .render(`./../views/pages/project-management/taskChecklistEntriesTable`);
};
//PROJECT MANAGEMENT CONTROLLER
exports.taskcheckliststatus = (req, res) => {
  console.log('We are in taskChecklistStatus Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/taskChecklistStatus');
};
exports.projectTaskFiles = (req, res) => {
  console.log('We are in projectTaskFiles Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectTaskFiles');
};
exports.projectFiles = (req, res) => {
  console.log('We are in projectFiles Form Page');
  res.status(200).render('./../views/pages/project-management/projectFiles');
};
exports.projectDiscussionComments = (req, res) => {
  console.log('We are in projectDiscussionComments Form Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectDiscussionComments');
};
// PROJECT MANAGEMENT TABLE CONTROLLER
exports.taskcheckliststatusTable = (req, res) => {
  console.log('We are in taskChecklistStatus Table Page');
  res
    .status(200)
    .render('./../views/pages/project-management/taskChecklistStatusTable');
};
exports.projectTaskFilesTable = (req, res) => {
  console.log('We are in projectTaskFiles Table Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectTaskFilesTable');
};
exports.projectFilesTable = (req, res) => {
  console.log('We are in projectFiles Table Page');
  res
    .status(200)
    .render('./../views/pages/project-management/projectFilesTable');
};
exports.projectDiscussionCommentsTable = (req, res) => {
  console.log('We are in projectDiscussionComments Table Page');
  res
    .status(200)
    .render(
      './../views/pages/project-management/projectDiscussionCommentsTable'
    );
};

exports.deviceManagementExample = (req, res) => {
  console.log('We are in device Management Example page');
  res.status(200).render('./../views/pages/device-management/example');
};
