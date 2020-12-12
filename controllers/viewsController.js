/* DEPENDENCIES */

/* MIDDLEWARES */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const MenuManager = require('../models/menu/menuManagerModel');
const MenuSection = require('../models/menu/menuSectionModel');
const MenuItems = require('../models/menu/menuItemsModel');
const MenuSubItems1 = require('../models/menu/menuSubItems1Model');
const MenuSubItems2 = require('../models/menu/menuSubItems2Model');

const doc = {
  name: 'aside-menu',
  content: 'This content is from overview.pug',
  sectionItems: [
    {
      sectionName: 'Module Management',
      isSection: false,
      priority: 1,
      menuItemsNo: 11,
      menuItems: [
        {
          name: 'Announcements',
          route: 'announcements',
          imgPath: '',
          priority: 1,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Comments',
          route: 'comments',
          imgPath: '',
          priority: 2,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Contracts',
          route: 'contracts',
          imgPath: '',
          priority: 3,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Directory',
          route: 'directory',
          imgPath: '',
          priority: 4,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Ecommerce',
          route: 'ecommerce',
          imgPath: '',
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Events',
          route: 'events',
          imgPath: '',
          priority: 6,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Leads',
          route: 'leads',
          imgPath: '',
          priority: 7,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Newsletter',
          route: 'newsletter',
          imgPath: '',
          priority: 8,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Ratings',
          route: 'ratings',
          imgPath: '',
          priority: 9,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Projects',
          route: 'projects',
          imgPath: '',
          priority: 10,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
        {
          name: 'Tickets & Support',
          route: 'tickets-support',
          imgPath: '',
          priority: 11,
          subItems1No: 2,
          subItems1: [
            {
              name: 'Add New',
              route: 'add-new',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'View All',
              route: 'view-all',
              priority: 2,
              subItems2No: 0,
            },
          ],
        },
      ],
    },
    {
      sectionName: 'Administration',
      isSection: false,
      priority: 2,
      menuItemsNo: 2,
      menuItems: [
        {
          name: 'Account Settings',
          route: 'account-settings',
          priority: 1,
          subItems1No: 6,
          subItems1: [
            {
              name: 'Subscription',
              route: 'subscription',
              priority: 1,
              subItems2No: 2,
              subItems2: [
                {
                  name: 'Add New',
                  route: 'subscription/add-new',
                  priority: 1,
                },
                {
                  name: 'View All',
                  route: 'subscription/view-all',
                  priority: 2,
                },
              ],
            },
            {
              name: 'Users',
              route: 'users',
              priority: 2,
              subItems2No: 2,
              subItems2: [
                {
                  name: 'Add New',
                  route: 'users/add-new',
                  priority: 1,
                },
                {
                  name: 'View All',
                  route: 'users/view-all',
                  priority: 2,
                },
              ],
            },
            {
              name: 'User Group',
              route: 'usergroups',
              priority: 3,
              subItems2No: 2,
              subItems2: [
                {
                  name: 'Add New',
                  route: 'usergroups/add-new',
                  priority: 1,
                },
                {
                  name: 'View All',
                  route: 'usergroups/view-all',
                  priority: 2,
                },
              ],
            },
            {
              name: 'User Roles',
              route: 'userroles',
              priority: 4,
              subItems2No: 2,
              subItems2: [
                {
                  name: 'Add New',
                  route: 'userroles/add-new',
                  priority: 1,
                },
                {
                  name: 'View All',
                  route: 'userroles/view-all',
                  priority: 2,
                },
              ],
            },
            {
              name: 'Module Access',
              route: 'moduleaccess',
              priority: 5,
              subItems2No: 2,
              subItems2: [
                {
                  name: 'Add New',
                  route: 'moduleaccess/add-new',
                  priority: 1,
                },
                {
                  name: 'View All',
                  route: 'moduleaccess/view-all',
                  priority: 2,
                },
              ],
            },
            {
              name: 'Database Access',
              route: 'databaseaccess',
              priority: 5,
              subItems2No: 2,
              subItems2: [
                {
                  name: 'Add New',
                  route: 'databaseaccess/add-new',
                  priority: 1,
                },
                {
                  name: 'View All',
                  route: 'databaseaccess/view-all',
                  priority: 2,
                },
              ],
            },
          ],
        },
        {
          name: 'Menu',
          route: 'menu',
          imgPath: '',
          priority: 3,
          subItems1No: 5,
          subItems1: [
            {
              name: 'Menu Manager',
              route: 'menu/manager',
              priority: 1,
              subItems2No: 0,
            },
            {
              name: 'Menu Section',
              route: 'menu/section',
              priority: 2,
              subItems2No: 0,
            },
            {
              name: 'Menu Items',
              route: 'menu/items',
              priority: 3,
              subItems2No: 0,
            },
            {
              name: 'Menu Sub-Items1',
              route: 'menu/subitems1',
              priority: 4,
              subItems2No: 0,
            },
            {
              name: 'Menu Sub-Items2',
              route: 'menu/subitems2',
              priority: 5,
              subItems2No: 0,
            },
          ],
        },
      ],
    },
  ],
};

// STANDARD FORM RELATED CONTROLLER
exports.getTest = (req, res) => {
  console.log('We are in Standard Form');
  res.status(200).render(`./../views/pages/example/test`, doc);
};

/* MENU */
// MANAGER
exports.getMenuManager = (req, res) => {
  console.log('We are in Menu Manager');

  res.status(200).render('./pages/overview', doc);
};
// SECTION
exports.getMenuSection = (req, res) => {
  console.log('We are in Menu Section');

  res.status(200).render('./pages/overview', doc);
};
// ITEMS
exports.getMenuItems = (req, res) => {
  console.log('We are in Menu Items');

  res.status(200).render('./pages/overview', doc);
};
// SUB-ITEMS1
exports.getMenuSubItems1 = (req, res) => {
  console.log('We are in Menu sub items 1');

  res.status(200).render('./pages/overview', doc);
};
// SUB-ITEMS2
exports.getMenuSubItems2 = (req, res) => {
  console.log('We are in Menu sub items 2');

  res.status(200).render('./pages/overview', doc);
};

// OVERVIEW RELATED CONTROLLER
exports.getOverview = (req, res) => {
  console.log('We are in viewsController');

  res.status(200).render('./pages/overview', doc);
};

// EXAMPLE RELATED CONTROLLER
exports.getExample = (req, res) => {
  console.log('We are in Example Page');

  res.status(200).render('./../views/pages/example/example', doc);
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

  res.status(200).render('./pages/users/forgotPassword', doc);
};
exports.getError = (req, res) => {
  console.log('We are in Error Page');

  res.status(200).render('./pages/error');
};

// USERS RELATED CONTROLLER
exports.getAllUser = (req, res) => {
  console.log('We are in All Users Page');

  res.status(200).render('./../views/pages/users/all-users', doc);
};
exports.getAddUser = (req, res) => {
  console.log('We are in Add Users Page');
  res.status(200).render(`./../views/pages/users/add-user`, doc);
};

// STANDARD FORM RELATED CONTROLLER
exports.getForm = (req, res) => {
  console.log('We are in Standard Form');
  res.status(200).render(`./../views/pages/example/form`, doc);
};

// TABLE RELATED CONTROLLER
exports.getLocalTable = (req, res) => {
  console.log('We are in Tables Page');
  res.status(200).render(`./../views/pages/example/local-table`, doc);
};
exports.getRemoteTable = (req, res) => {
  console.log('We are in Tables Page');
  res.status(200).render(`./../views/pages/example/remote-table`, doc);
};
// ANNOUNCEMENT RELATED CONTROLLER
exports.announcementEntries = (req, res) => {
  console.log('We are in Announcement Entries Form Page');
  res
    .status(200)
    .render('./../views/pages/announcement/announcementEntries', doc);
};
// ANNOUNCEMENT RELATED CONTROLLER
exports.announcementEntriesTable = (req, res) => {
  console.log('We are in Announcement Entries Table Page');
  res
    .status(200)
    .render('./../views/pages/announcement/announementEntriesTable', doc);
};

exports.announcementNotify = (req, res) => {
  console.log('We are in Announcement Notifications Form Page');
  res
    .status(200)
    .render('./../views/pages/announcement/announcementNotify', doc);
};

// ANALYTICS RELATED CONTROLLER
exports.analytics = (req, res) => {
  console.log('We are in Analytics Form Page');
  res.status(200).render('./../views/pages/analytics/analytics', doc);
};

// NEWSLETTER RELATED CONTROLLER
exports.newsletterMessages = (req, res) => {
  console.log('We are in Newsletter Messages Form Page');
  res.status(200).render('./../views/pages/newsletter/newsletterMessages', doc);
};

exports.newsletterEntries = (req, res) => {
  console.log('We are in Newsletter Entries Form Page');
  res.status(200).render('./../views/pages/newsletter/newsletterEntries', doc);
};

// RATING RELATED CONTROLLER
exports.ratingAttributeGroups = (req, res) => {
  console.log('We are in Rating AttributeGroups Form Page');
  res.status(200).render('./../views/pages/rating/ratingAttributeGroups', doc);
};

exports.ratingAttribute = (req, res) => {
  console.log('We are in Rating Attribute Form Page');
  res.status(200).render('./../views/pages/rating/ratingAttribute', doc);
};

exports.ratingEntries = (req, res) => {
  console.log('We are in Rating Entries Form Page');
  res.status(200).render('./../views/pages/rating/ratingEntries', doc);
};

// EVENT RELATED CONTROLLER
exports.eventEntries = (req, res) => {
  console.log('We are in event Entries Form Page');
  res.status(200).render('./../views/pages/event/eventEntries', doc);
};

// LEADS RELATED CONTROLLER
exports.leadCategories = (req, res) => {
  console.log('We are in Lead Categories Form Page');
  res.status(200).render('./../views/pages/leads/leadCategories', doc);
};

exports.leadResponse = (req, res) => {
  console.log('We are in Lead Response Form Page');
  res.status(200).render('./../views/pages/leads/leadResponse', doc);
};

exports.leadEntries = (req, res) => {
  console.log('We are in Lead Entries Form Page');
  res.status(200).render('./../views/pages/leads/leadEntries', doc);
};

// SALES AND FINANCE RELATED CONTROLLER
exports.address = (req, res) => {
  console.log('We are in address Form Page');
  res.status(200).render('./../views/pages/sales-finance/address', doc);
};

exports.deliveryNote = (req, res) => {
  console.log('We are in Delivery Note Form Page');
  res.status(200).render('./../views/pages/sales-finance/deliveryNote', doc);
};

exports.packingList = (req, res) => {
  console.log('We are in Packing List Form Page');
  res.status(200).render('./../views/pages/sales-finance/packingList', doc);
};

exports.quotation = (req, res) => {
  console.log('We are in Quotation Form Page');
  res.status(200).render('./../views/pages/sales-finance/quotation', doc);
};

exports.taxInvoice = (req, res) => {
  console.log('We are in Tax Invoice Form Page');
  res.status(200).render('./../views/pages/sales-finance/taxInvoice', doc);
};

exports.performaInvoice = (req, res) => {
  console.log('We are in Performa Invoice Form Page');
  res.status(200).render('./../views/pages/sales-finance/performaInvoice', doc);
};

// COMMENTS RELATED CONTROLLER
exports.commentEntries = (req, res) => {
  console.log('We are in comment Entries Form Page');
  res.status(200).render('./../views/pages/comments/commentEntries', doc);
};
// TICKET AND SUPPORTS RELATED CONTROLLER
exports.ticketCategories = (req, res) => {
  console.log('We are in ticketCategories Form Page');
  res
    .status(200)
    .render('./../views/pages/ticket-support/ticketCategories', doc);
};
exports.ticketProducts = (req, res) => {
  console.log('We are in ticketProducts Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketProducts', doc);
};
exports.ticketEntries = (req, res) => {
  console.log('We are in ticketEntries Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketEntries', doc);
};
exports.ticketProducts = (req, res) => {
  console.log('We are in ticketProducts Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketProducts', doc);
};
exports.ticketResponse = (req, res) => {
  console.log('We are in ticketResponse  Form Page');
  res.status(200).render('./../views/pages/ticket-support/ticketResponse', doc);
};

// DIRECTORY RELATED CONTROLLER
exports.directoryAttributesGroups = (req, res) => {
  console.log('We are in directory Attributes Groups Form Page');
  res
    .status(200)
    .render('./../views/pages/directory/directoryAttributesGroups', doc);
};

exports.directoryCategories = (req, res) => {
  console.log('We are in directory Categories Form Page');
  res.status(200).render('./../views/pages/directory/directoryCategories', doc);
};

exports.directoryLevels = (req, res) => {
  console.log('We are in directory Levels Form Page');
  res.status(200).render('./../views/pages/directory/directoryLevels', doc);
};

exports.directoryEntries = (req, res) => {
  console.log('We are in directory Entries Form Page');
  res.status(200).render('./../views/pages/directory/directoryEntries', doc);
};

exports.directory = (req, res) => {
  console.log('We are in directory Form Page');
  res.status(200).render('./../views/pages/directory/directory', doc);
};

exports.deliveryNote = (req, res) => {
  console.log('We are in Delivery Note Form Page');
  res.status(200).render('./../views/pages/sales-finance/deliveryNote', doc);
};

// Pages RELATED CONTROLLER
exports.pages = (req, res) => {
  console.log('We are in Pages Form Page');
  res.status(200).render('./../views/pages/pages/pages', doc);
};

// CHARTS RELATED CONTROLLER
exports.charts = (req, res) => {
  console.log('We are in Charts Form Page');
  res.status(200).render('./../views/pages/charts/charts', doc);
};

// FORMS RELATED CONTROLLER
exports.formResponse = (req, res) => {
  console.log('We are in Form Response Page');
  res.status(200).render('./../views/pages/forms/formResponse', doc);
};

exports.forms = (req, res) => {
  console.log('We are in Forms Page');
  res.status(200).render('./../views/pages/forms/forms', doc);
};

// REPORTS RELATED CONTROLLER
exports.reports = (req, res) => {
  console.log('We are in Reports Form Page');
  res.status(200).render('./../views/pages/reports/reports', doc);
};

// PRECISION AGRICULTURE RELATED CONTROLLER
exports.farmEntries = (req, res) => {
  console.log('We are in Farm Entries Form Page');
  res
    .status(200)
    .render('./../views/pages/precision-agriculture/farmEntries', doc);
};

exports.farmExportedStrategy = (req, res) => {
  console.log('We are in Farm Exported Strategy Form Page');
  res
    .status(200)
    .render('./../views/pages/precision-agriculture/farmExportedStrategy', doc);
};

exports.farmRegions = (req, res) => {
  console.log('We are in Farm Regions Form Page');
  res
    .status(200)
    .render('./../views/pages/precision-agriculture/farmRegions', doc);
};

exports.farmStrategy = (req, res) => {
  console.log('We are in Farm Strategy Form Page');
  res
    .status(200)
    .render('./../views/pages/precision-agriculture/farmStrategy', doc);
};

// ECOMMERCE RELATED CONTROLLER
exports.ecommerceAddress = (req, res) => {
  console.log('We are in Ecommerce Address Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceAddress', doc);
};

exports.ecommerceLocations = (req, res) => {
  console.log('We are in Ecommerce Location Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceLocations', doc);
};

exports.ecommerceStock = (req, res) => {
  console.log('We are in Ecommerce Stock Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceStock', doc);
};

exports.ecommerceOrder = (req, res) => {
  console.log('We are in Ecommerce Order Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceOrder', doc);
};

exports.ecommerceProducts = (req, res) => {
  console.log('We are in Ecommerce Order Form Page');
  res.status(200).render('./../views/pages/ecommerce/ecommerceProducts', doc);
};
