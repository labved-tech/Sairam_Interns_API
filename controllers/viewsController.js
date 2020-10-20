exports.getOverview = (req, res) => {
  console.log('dashboard');
  const doc = {
    name: 'aside-menu',
    content: 'This content is from dashboard.pug',
    sectionItems: [
      {
        sectionName: 'Settings',
        isSection: false,
        menuItems: [
          {
            name: 'Account Settings',
            route: '',
            subItems1: [
              {
                name: 'Subscription',
                route: 'subscription',
                subItems2: [
                  {
                    name: 'Add New',
                    route: 'add-new',
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
                  },
                ],
              },
              {
                name: 'Users',
                route: 'users',
                subItems2: [
                  {
                    name: 'Add New',
                    route: 'add-new',
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        sectionName: 'Settings',
        isSection: false,
        menuItems: [
          {
            name: 'Account Settings',
            route: '',
            subItems1: [
              {
                name: 'Subscription',
                route: 'subscription',
                subItems2: [
                  {
                    name: 'Add New',
                    route: 'add-new',
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
                  },
                ],
              },
              {
                name: 'Users',
                route: 'users',
                subItems2: [
                  {
                    name: 'Add New',
                    route: 'add-new',
                  },
                  {
                    name: 'View All',
                    route: 'view-all',
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
