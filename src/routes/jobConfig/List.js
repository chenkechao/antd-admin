import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button, Divider, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, onRuleConfig, onSelectServer, onJobStatus, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleSelectServer = (record, e) => {
    onSelectServer(record)
  }

  const handleJobStatus = (record, e) => {
    onJobStatus(record)
  }

  const handleMenuClick = (record, e) => {
    if (e.key === '0') {
      onRuleConfig(record)
    } else if (e.key === '1') {
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
      title: 'jobId',
      dataIndex: 'jobId',
      key: 'jobId',
    }, {
      title: 'ip',
      dataIndex: 'instance.ip',
      key: 'ip',
    }, {
      title: 'port',
      dataIndex: 'instance.port',
      key: 'port',
    }, {
      title: 'gtid',
      dataIndex: 'instance.gtid',
      key: 'gtid',
    }, {
      title: 'serverId',
      dataIndex: 'instance.serverId',
      key: 'serverId',
    }, {
      title: 'rules',
      key: 'rules',
      render: (text, record) => {
        if (record.hasOwnProperty('rules')&&record.rules != null) {
          return record.rules.map((item) => {
            return <Tag color="blue">{item.rule}</Tag>
          })
        }
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 300,
      render: (text, record) => {
        return (<div>
          <a href="#" onClick={e => handleSelectServer(record, e)}>选择服务器</a>
          <Divider type="vertical" />
          {/*<a href="#" onClick={e => handleJobStatus(record, e)}>运行状态</a>*/}
          {/*<Divider type="vertical" />*/}
          <DropOption onMenuClick={e => handleMenuClick(record, e)}
            menuOptions={[
              { key: '0', name: '规则配置' },
              { key: '1', name: '编辑' },
              { key: '2', name: '删除' }]} /></div>)
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.jobId}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onRuleConfig: PropTypes.func,
  onSelectServer: PropTypes.func,
  onJobStatus: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
