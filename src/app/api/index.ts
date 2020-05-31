import { getInfo } from './info.api'
import { getRanking } from './ranking.api'
import { generateGamePlan } from './generator.api'
import { create, findOne, update, destroy } from './tournament.api'
import { addGamePlan, findAllGames, findGame, updateGame } from './game.api'
import {
  addTeam,
  findAllTeams,
  findTeam,
  removeTeam,
  updateTeam,
} from './team.api'

export const API = {
  getInfo,
  Tournament: {
    create,
    findOne,
    update,
    destroy,
    addTeam,
    findAllTeams,
    findTeam,
    removeTeam,
    updateTeam,
    addGamePlan,
    findAllGames,
    findGame,
    updateGame,
    getRanking,
    generateGamePlan,
  },
}
