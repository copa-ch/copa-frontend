import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/tournament/:id/admin',
    component: () => import('../views/admin/TournamentAdminDashboard.vue'),
    children: [
      {
        path: '',
        redirect: 'teams',
      },
      {
        path: 'teams',
        name: 'admin-teams',
        component: () => import('../views/admin/TournamentAdminTeams.vue'),
      },
      {
        path: 'config',
        name: 'admin-config',
        component: () => import('../views/admin/TournamentAdminConfig.vue'),
      },
      {
        path: 'generate',
        name: 'admin-generate',
        component: () => import('../views/admin/TournamentAdminGenerate.vue'),
      },
    ],
  },
  {
    path: '/tournament/:id',
    component: () => import('../views/tournament/TournamentDashboard.vue'),
    children: [
      {
        path: '',
        name: 'tournament.teams',
        component: () => import('../views/tournament/TournamentTeams.vue'),
      },
    ],
  },
  { path: '*', redirect: '/' },
]
