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

  let spanSum = 0

  const columns = [
    {
      title: 'ip',
      dataIndex: 'machine.ip',
      key: 'ip',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };

        // if(spanSum > 0){
        //   if(index < spanSum-1){
        //     obj.props.rowSpan = 0
        //   }else if(index == spanSum-1){
        //     spanSum += row.machine.jobSize
        //     obj.props.rowSpan = row.machine.jobSize
        //   }
        // }else{
        //   if(row.machine.jobSize > 0){
        //     spanSum = row.machine.jobSize
        //     if(spanSum > 1){
        //       obj.props.rowSpan = 0
        //     }
        //   }
        // }
        if(row.machine.jobSize > 1){
          if(index == spanSum || spanSum == 0){
            spanSum += row.machine.jobSize
            obj.props.rowSpan = row.machine.jobSize
          }else{
            obj.props.rowSpan = 0
          }
        }else{
          spanSum ++
        }

        return obj;
      },
    },
    {
      title: 'job',
      dataIndex: 'jobId',
      key: 'job',
      // render: (text, record, index) => {
      //   // const obj = {
      //   //   children: value,
      //   //   props: {},
      //   // }
      //   // if (index === 4) {
      //   //   obj.props.colSpan = 0
      //   // }
      //   // return obj
      //   if (record.hasOwnProperty('jobOperates')&&record.jobOperates != null) {
      //     return record.jobOperates.map((item) => {
      //       return <Tag color="blue">{item.jobId}</Tag>
      //     })
      //   }
      // },
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
