import { RouteConfig } from 'vue-router'

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        name: 'home.index',
        component: () => import('../views/HomeIndex.vue'),
      },
      {
        path: '/create',
        name: 'home.create',
        component: () => import('../views/HomeCreate.vue'),
      },
    ],
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/Privacy.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/tournament/:hash',
    name: 'tournament',
    component: () => import('../views/Tournament.vue'),
    children: [
      {
        path: '/tournament/:hash',
        redirect: '/tournament/:hash/teams',
      },
      {
        path: '/tournament/:hash/teams',
        name: 'tournament.teams',
        component: () => import('../views/TournamentTeams.vue'),
      },
      {
        path: '/tournament/:hash/games',
        name: 'tournament.games',
        component: () => import('../views/TournamentGames.vue'),
      },
      {
        path: '/tournament/:hash/ranking',
        name: 'tournament.ranking',
        component: () => import('../views/TournamentRanking.vue'),
      },
      {
        path: '/tournament/:hash/settings',
        name: 'tournament.settings',
        component: () => import('../views/TournamentSettings.vue'),
      },
    ],
  },
  { path: '*', redirect: '/' },
]
