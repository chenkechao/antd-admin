import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
//  import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const MappingList = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除吗?',
        onOk () {
          onDeleteItem(record)
        },
      })
    }
  }

  const columns = [
    {
      title: 'table',
      dataIndex: 'table',
      key: 'table',
    }, {
      title: 'logical_table',
      dataIndex: 'logical_table',
      key: 'logical_table',
    }, {
      title: 'topic',
      dataIndex: 'topic',
      key: 'topic',
    }, {
      title: 'columns',
      key: 'columns',
      width: 300,
      render: (text, record) => {
        if (record.hasOwnProperty('columns')&&record.columns != null) {
          return record.columns.map((item) => {
            return <Tag color="blue">{item}</Tag>
          })
        }
      },
    }, {
      title: 'key',
      dataIndex: 'key',
      key: 'key',
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

  const getBodyWrapperProps = {
  }

  const getBodyWrapper = (body) => {
    return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div style={{ height: '500px' }}>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        columns={columns}
        simple
        rowKey={record => record.table}
        scroll={{ y: 400 }}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

MappingList.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default MappingList
