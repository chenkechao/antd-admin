import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import styles from '../List.less'

const ServerList = ({ location, ...tableProps }) => {

  const columns = [
    {
      title: '服务器',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '地址',
      dataIndex: 'ip',
      key: 'ip',
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

ServerList.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default ServerList
