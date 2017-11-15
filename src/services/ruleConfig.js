import { request, config } from 'utils'

const { api } = config
const { ruleConfig } = api

export async function createRule (params) {
  return request({
    url: ruleConfig.replace('/:id', '/createRule'),
    //  url: 'http://localhost:8080/api/v1/jobConfig/create',
    method: 'post',
    data: params,
  })
}

