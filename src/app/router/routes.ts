import { RouteConfig } from 'vue-router'

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/app/pages/Home.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/app/pages/Privacy.vue'),
  },
  {
    path: '/tournament/:id',
    name: 'tournament',
    component: () => import('@/app/pages/tournament/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'tournament-teams',
        component: () => import('../pages/tournament/Teams.vue'),
        meta: {
          title: 'tournament.teams.title',
        },
      },
      {
        path: 'fixtures',
        name: 'tournament-fixtures',
        component: () => import('../pages/tournament/Fixtures.vue'),
        meta: {
          title: 'tournament.fixtures.title',
        },
      },
      {
        path: 'ranking',
        name: 'tournament-ranking',
        component: () => import('../pages/tournament/Ranking.vue'),
        meta: {
          title: 'tournament.ranking.title',
        },
      },
    ],
  },
  // {
  //   path: '/tournament/:id/admin',
  //   component: () => import('../pages/admin/TournamentAdminDashboard.vue'),
  //   children: [
  //     {
  //       path: '',
  //       redirect: 'teams',
  //     },
  //     {
  //       path: 'teams',
  //       name: 'admin-teams',
  //       component: () => import('../pages/admin/TournamentAdminTeams.vue'),
  //     },
  //     {
  //       path: 'settings',
  //       name: 'admin-settings',
  //       component: () => import('../pages/admin/TournamentAdminSettings.vue'),
  //     },
  //     {
  //       path: 'fixtures',
  //       name: 'admin-fixtures',
  //       component: () => import('../pages/admin/TournamentAdminFixtures.vue'),
  //     },
  //     {
  //       path: 'ranking',
  //       name: 'admin-ranking',
  //       component: () => import('../pages/admin/TournamentAdminRanking.vue'),
  //     },
  //   ],
  // },
  // {
  //   path: '/tournament/:id',
  //   component: () => import('../pages/tournament/TournamentDashboard.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'tournament.teams',
  //       component: () => import('../pages/tournament/TournamentTeams.vue'),
  //     },
  //   ],
  // },
  { path: '*', redirect: '/' },
]
