const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a sample board
  const board = await prisma.board.create({
    data: {
      name: 'Platform Launch',
      columns: {
        create: [
          {
            name: 'TODO',
            color: '#49C4E5',
            order: 0,
            tasks: {
              create: [
                {
                  title: 'Build UI for onboarding flow',
                  description: 'Create wireframes and design the onboarding flow for new users',
                  order: 0,
                  subtasks: {
                    create: [
                      { title: 'Sign up page', isCompleted: true, order: 0 },
                      { title: 'Sign in page', isCompleted: false, order: 1 },
                      { title: 'Welcome page', isCompleted: false, order: 2 },
                    ],
                  },
                },
                {
                  title: 'Build UI for search',
                  description: 'Implement the search functionality with filters',
                  order: 1,
                  subtasks: {
                    create: [
                      { title: 'Search page', isCompleted: false, order: 0 },
                    ],
                  },
                },
                {
                  title: 'Build settings UI',
                  description: 'Create the settings interface for user preferences',
                  order: 2,
                  subtasks: {
                    create: [
                      { title: 'Account page', isCompleted: false, order: 0 },
                      { title: 'Billing page', isCompleted: false, order: 1 },
                    ],
                  },
                },
                {
                  title: 'QA and test all major user journeys',
                  description: 'Ensure all user flows work correctly end-to-end',
                  order: 3,
                  subtasks: {
                    create: [
                      { title: 'Internal testing', isCompleted: false, order: 0 },
                      { title: 'External testing', isCompleted: false, order: 1 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'DOING',
            color: '#8471F2',
            order: 1,
            tasks: {
              create: [
                {
                  title: 'Design settings and search pages',
                  description: 'Create high-fidelity designs for settings and search',
                  order: 0,
                  subtasks: {
                    create: [
                      { title: 'Settings - Account page', isCompleted: true, order: 0 },
                      { title: 'Settings - Billing page', isCompleted: true, order: 1 },
                      { title: 'Search page', isCompleted: false, order: 2 },
                    ],
                  },
                },
                {
                  title: 'Add account management endpoints',
                  description: 'Create API endpoints for user account management',
                  order: 1,
                  subtasks: {
                    create: [
                      { title: 'Upgrade plan', isCompleted: true, order: 0 },
                      { title: 'Cancel plan', isCompleted: true, order: 1 },
                      { title: 'Update payment method', isCompleted: false, order: 2 },
                    ],
                  },
                },
                {
                  title: 'Design onboarding flow',
                  description: 'Create the user onboarding experience design',
                  order: 2,
                  subtasks: {
                    create: [
                      { title: 'Sign up page', isCompleted: true, order: 0 },
                      { title: 'Sign in page', isCompleted: false, order: 1 },
                      { title: 'Welcome page', isCompleted: false, order: 2 },
                    ],
                  },
                },
                {
                  title: 'Add search endpoints',
                  description: 'Implement backend search functionality',
                  order: 3,
                  subtasks: {
                    create: [
                      { title: 'Add search endpoint', isCompleted: true, order: 0 },
                      { title: 'Define search filters', isCompleted: false, order: 1 },
                    ],
                  },
                },
                {
                  title: 'Add authentication endpoints',
                  description: 'Create secure authentication API endpoints',
                  order: 4,
                  subtasks: {
                    create: [
                      { title: 'Define user model', isCompleted: true, order: 0 },
                      { title: 'Add auth endpoints', isCompleted: false, order: 1 },
                    ],
                  },
                },
                {
                  title: 'Research pricing points of various competitors',
                  description: 'Analyze competitor pricing strategies',
                  order: 5,
                  subtasks: {
                    create: [
                      { title: 'Research competitor pricing', isCompleted: true, order: 0 },
                      { title: 'Propose different business models', isCompleted: false, order: 1 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'DONE',
            color: '#67E2AE',
            order: 2,
            tasks: {
              create: [
                {
                  title: 'Conduct 5 wireframe tests',
                  description: 'Test wireframes with potential users',
                  order: 0,
                  subtasks: {
                    create: [
                      { title: 'Interview 10 prospective customers', isCompleted: true, order: 0 },
                    ],
                  },
                },
                {
                  title: 'Create wireframe prototype',
                  description: 'Build interactive wireframe prototype',
                  order: 1,
                  subtasks: {
                    create: [
                      { title: 'Create clickable wireframe prototype in Figma', isCompleted: true, order: 0 },
                    ],
                  },
                },
                {
                  title: 'Review results of usability tests and iterate',
                  description: 'Analyze feedback and improve designs',
                  order: 2,
                  subtasks: {
                    create: [
                      { title: 'Meet to review notes from previous tests', isCompleted: true, order: 0 },
                      { title: 'Make changes to paper prototypes', isCompleted: true, order: 1 },
                      { title: 'Conduct 5 usability tests', isCompleted: true, order: 2 },
                    ],
                  },
                },
                {
                  title: 'Create paper prototypes for version one',
                  description: 'Sketch initial design concepts',
                  order: 3,
                  subtasks: {
                    create: [
                      { title: 'Create paper prototypes', isCompleted: true, order: 0 },
                    ],
                  },
                },
                {
                  title: 'Market discovery',
                  description: 'Research target market and user needs',
                  order: 4,
                  subtasks: {
                    create: [
                      { title: 'Interview 10 prospective customers', isCompleted: true, order: 0 },
                    ],
                  },
                },
                {
                  title: 'Competitor analysis',
                  description: 'Analyze competitor products and strategies',
                  order: 5,
                  subtasks: {
                    create: [
                      { title: 'Find direct and indirect competitors', isCompleted: true, order: 0 },
                      { title: 'SWOT analysis for each competitor', isCompleted: true, order: 1 },
                    ],
                  },
                },
                {
                  title: 'Research the market',
                  description: 'Conduct comprehensive market research',
                  order: 6,
                  subtasks: {
                    create: [
                      { title: 'Write up research analysis', isCompleted: true, order: 0 },
                      { title: 'Calculate TAM', isCompleted: true, order: 1 },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Created board:', board.name);

  // Create another sample board
  const marketingBoard = await prisma.board.create({
    data: {
      name: 'Marketing Plan',
      columns: {
        create: [
          {
            name: 'TODO',
            color: '#49C4E5',
            order: 0,
            tasks: {
              create: [
                {
                  title: 'Plan Product Hunt launch',
                  order: 0,
                  subtasks: {
                    create: [
                      { title: 'Find hunter', isCompleted: false, order: 0 },
                      { title: 'Prepare assets', isCompleted: false, order: 1 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'DOING',
            color: '#8471F2',
            order: 1,
          },
          {
            name: 'DONE',
            color: '#67E2AE',
            order: 2,
          },
        ],
      },
    },
  });

  console.log('✅ Created board:', marketingBoard.name);

  // Create a roadmap board
  const roadmapBoard = await prisma.board.create({
    data: {
      name: 'Roadmap',
      columns: {
        create: [
          {
            name: 'NOW',
            color: '#49C4E5',
            order: 0,
            tasks: {
              create: [
                {
                  title: 'Launch version one',
                  order: 0,
                  subtasks: {
                    create: [
                      { title: 'Launch privately to our waitlist', isCompleted: false, order: 0 },
                      { title: 'Launch publicly on PH, HN, etc.', isCompleted: false, order: 1 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'NEXT',
            color: '#8471F2',
            order: 1,
            tasks: {
              create: [
                {
                  title: 'Add multi-board support',
                  order: 0,
                  subtasks: {
                    create: [
                      { title: 'Design UI', isCompleted: false, order: 0 },
                      { title: 'Build backend', isCompleted: false, order: 1 },
                      { title: 'Test thoroughly', isCompleted: false, order: 2 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'LATER',
            color: '#67E2AE',
            order: 2,
            tasks: {
              create: [
                {
                  title: 'Add mobile apps',
                  order: 0,
                  subtasks: {
                    create: [
                      { title: 'iOS app', isCompleted: false, order: 0 },
                      { title: 'Android app', isCompleted: false, order: 1 },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Created board:', roadmapBoard.name);
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
