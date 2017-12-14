import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'

const MachineConfig = ({ location, dispatch, machineConfig, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination } = machineConfig

  const listProps = {
    dataSource: list,
    loading: loading.effects['machineConfig/query'],
    pagination,
    location,
  }
  return (
    <Page inner>
      <List {...listProps} />
    </Page>
  )
}

MachineConfig.propTypes = {
  machineConfig: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ machineConfig, loading }) => ({ machineConfig, loading }))(MachineConfig)
