import { RouteConfig } from 'vue-router'
import Home from '../pages/Home.vue'

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../pages/Privacy.vue'),
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
