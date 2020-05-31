import { Request, HttpResponse } from './request'
import { CreateTeamDto } from '../dto/create-team.dto'
import { TeamDto } from '../dto/team.dto'
import { UpdateTeamDto } from '../dto/update-team.dto'

const request = Request('/tournament')

export const addTeam = async (
  hash: string,
  data: CreateTeamDto,
): Promise<HttpResponse<TeamDto>> => {
  return request()
    .method('POST')
    .url(`/${hash}/team`)
    .data(data)
    .returns(TeamDto)
    .fire()
}

export const findAllTeams = async (
  hash: string,
): Promise<HttpResponse<TeamDto[]>> => {
  return request()
    .url(`/${hash}/team`)
    .returns(TeamDto)
    .isList()
    .fire()
}

export const findTeam = async (
  hash: string,
  teamId: string,
): Promise<HttpResponse<TeamDto>> => {
  return request()
    .url(`/${hash}/team/${teamId}`)
    .returns(TeamDto)
    .fire()
}

export const updateTeam = async (
  hash: string,
  teamId: string,
  data: UpdateTeamDto,
): Promise<HttpResponse<TeamDto>> => {
  return request()
    .method('PUT')
    .url(`/${hash}/team/${teamId}`)
    .data(data)
    .returns(TeamDto)
    .fire()
}

export const removeTeam = async (
  hash: string,
  teamId: string,
): Promise<HttpResponse<undefined>> => {
  return request()
    .method('DELETE')
    .url(`/${hash}/team/${teamId}`)
    .fire()
}
