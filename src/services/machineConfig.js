import { request, config } from 'utils'

const { api } = config
const { machineConfig } = api

export async function startJob (params) {
  return request({
    url: machineConfig.replace('/:id', '/startJob'),
    method: 'get',
    data: params,
  })
}
