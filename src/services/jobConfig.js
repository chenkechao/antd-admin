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

export async function create (params) {
  return request({
    url: jobConfig.replace('/:id', '/create'),
    //  url: 'http://localhost:8080/api/v1/jobConfig/create',
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: jobConfig,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: jobConfig,
    method: 'patch',
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
