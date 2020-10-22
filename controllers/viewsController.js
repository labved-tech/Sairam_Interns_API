exports.getOverview = (req, res) => {
  console.log('We are in viewsController');
  const doc = {
    name: 'aside-menu',
    content: 'This content is from dashboard.pug',
    sectionItems: [
      {
        sectionName: 'Module Management',
        isSection: false,
        priority : 1,
        menuItemsNo: 11,
        menuItems:  [
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
        priority : 2,
        menuItemsNo: 1,
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
                    route: 'add-new',
                    priority: 1,
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
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
                    route: 'add-new',
                    priority: 1,
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
                    priority: 2,
                  },
                ],
              },
              {
                name: 'User Group',
                route: 'user-groups',
                priority: 3,
                subItems2No: 2,
                subItems2: [
                  {
                    name: 'Add New',
                    route: 'add-new',
                    priority: 1,
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
                    priority: 2,
                  },
                ],
              },
              {
                name: 'User Roles',
                route: 'user-roles',
                priority: 4,
                subItems2No: 2,
                subItems2: [
                  {
                    name: 'Add New',
                    route: 'add-new',
                    priority: 1,
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
                    priority: 2,
                  },
                ],
              },
              {
                name: 'Module Access',
                route: 'module-access',
                priority: 5,
                subItems2No: 2,
                subItems2: [
                  {
                    name: 'Add New',
                    route: 'add-new',
                    priority: 1,
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
                    priority: 2,
                  },
                ],
              },
              {
                name: 'Database Access',
                route: 'database-access',
                priority: 5,
                subItems2No: 2,
                subItems2: [
                  {
                    name: 'Add New',
                    route: 'add-new',
                    priority: 1,
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
                    priority: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  res.status(200).render('./pages/dashboard', doc);
};
