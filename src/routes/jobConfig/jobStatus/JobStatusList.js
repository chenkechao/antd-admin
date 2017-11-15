import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { DropOption } from 'components'
import classnames from 'classnames'
import styles from '../List.less'

const JobStatusList = ({ location, ...tableProps }) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      //  onEditItem(record)
    } else if (e.key === '2') {
      // confirm({
      //   title: '确定要删除吗?',
      //   onOk () {
      //     onDeleteItem(record.id)
      //   },
      // })
    }
  }

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'jobName',
      key: 'jobName',
    }, {
      title: '服务器',
      dataIndex: 'machine',
      key: 'machine',
    }, {
      title: '任务进程',
      dataIndex: 'excuteId',
      key: 'excuteId',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)}
          menuOptions={[
            { key: '1', name: '编辑' },
            { key: '2', name: '删除' }]} />
      },
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

JobStatusList.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default JobStatusList
