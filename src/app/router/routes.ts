import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/Privacy.vue'),
  },
  // {
  //   path: '/tournament/:id/admin',
  //   component: () => import('../views/admin/TournamentAdminDashboard.vue'),
  //   children: [
  //     {
  //       path: '',
  //       redirect: 'teams',
  //     },
  //     {
  //       path: 'teams',
  //       name: 'admin-teams',
  //       component: () => import('../views/admin/TournamentAdminTeams.vue'),
  //     },
  //     {
  //       path: 'settings',
  //       name: 'admin-settings',
  //       component: () => import('../views/admin/TournamentAdminSettings.vue'),
  //     },
  //     {
  //       path: 'fixtures',
  //       name: 'admin-fixtures',
  //       component: () => import('../views/admin/TournamentAdminFixtures.vue'),
  //     },
  //     {
  //       path: 'ranking',
  //       name: 'admin-ranking',
  //       component: () => import('../views/admin/TournamentAdminRanking.vue'),
  //     },
  //   ],
  // },
  // {
  //   path: '/tournament/:id',
  //   component: () => import('../views/tournament/TournamentDashboard.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'tournament.teams',
  //       component: () => import('../views/tournament/TournamentTeams.vue'),
  //     },
  //   ],
  // },
  { path: '*', redirect: '/' },
]
