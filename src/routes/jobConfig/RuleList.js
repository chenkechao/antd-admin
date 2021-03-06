import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const RuleList = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除吗?',
        onOk () {
          onDeleteItem(record.rule)
        },
      })
    }
  }

  const columns = [
    {
      title: 'rule',
      dataIndex: 'rule',
      key: 'rule',
    }, {
      title: 'db',
      key: 'db',
      render: (text, record) => {
        if (record.hasOwnProperty('db')&&record.db != null) {
          return record.db.map((item) => {
            return <Tag color="blue">{item}</Tag>
          })
        }
      },
    }, {
      title: 'mappings',
      key: 'mapping',
      width: 500,
      render: (text, record) => {
        if (record.hasOwnProperty('mapping')&&record.mapping != null) {
          return record.mapping.map((item) => {
            return <Tag color="blue">{item.table}</Tag>
          })
        }
      },
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
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        columns={columns}
        simple
        rowKey={record => record.rule}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

RuleList.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default RuleList
