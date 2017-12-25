import { request, config } from 'utils'

const { api } = config
const { jobConfig } = api

export async function query (params) {
  return request({
    url: jobConfig,
    method: 'get',
    data: params,
  })
}

export async function createConfig (params) {
  return request({
    url: jobConfig.replace('/:id', '/createConfig'),
    //  url: 'http://localhost:8080/api/v1/jobConfig/create',
    method: 'post',
    data: params,
  })
}

export async function deleteConfig (params) {
  return request({
    url: jobConfig.replace('/:id', '/deleteConfig'),
    method: 'post',
    data: params,
  })
}

export async function updateConfig (params) {
  return request({
    url: jobConfig.replace('/:id', '/updateConfig'),
    method: 'post',
    data: params,
  })
}

export async function createRule (params) {
  return request({
    url: jobConfig.replace('/:id', '/createRule'),
    //  url: 'http://localhost:8080/api/v1/jobConfig/create',
    method: 'post',
    data: params,
  })
}

export async function updateRule (params) {
  console.log(params)
  return request({
    url: jobConfig.replace('/:id', '/updateRule'),
    //  url: 'http://localhost:8080/api/v1/jobConfig/create',
    method: 'post',
    data: params,
  })
}
