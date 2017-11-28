import { request, config } from 'utils'

const { api } = config
const { jobConfigs, zkConfig } = api

export async function query (params) {
  return request({
    //  url: 'http://localhost:8080/api/v1/jobConfig/list',
    url: jobConfigs,
    method: 'get',
    data: params,
  })
}

export async function searhMachine (params) {
  return request({
    url: zkConfig.replace('/:id', '/searhMachine'),
    method: 'get',
    data: params,
  })
}

export async function registerZk (params) {
  return request({
    url: zkConfig.replace('/:id', '/registerZk'),
    method: 'get',
    data: params,
  })
}

export async function searhJobOpearte (params) {
  return request({
    url: jobConfigs.replace('/list', '/searhJobOpearte'),
    method: 'get',
    data: params,
  })
}
