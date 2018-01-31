import React from 'react'
import PropTypes from 'prop-types'
import { request } from 'utils'
import { Form, Input, Modal, Button } from 'antd'
import ServerList from './ServerList'

const modal = ({
  zk,
  onSelectOk,
  dispatch,
  loading,
  ...modalProps
}) => {
  const handleOk = () => {
    onSelectOk()
  }

  const listProps = {
    dataSource: zk.serverList,
    pagination: false,
    rowSelection: {
      getCheckboxProps(record) {
        return {
          defaultChecked: record.select === true, // 配置默认勾选的列
          // disabled: record.status === false,
        }
      },
      onChange: (selectedRowKeys, selectedRows ) => {
        // selectedRowKeys.push(keys)
        let zkNew = Object.assign({}, zk)// 克隆一个新的zk对象
        zkNew.selectedServerKeys = selectedRowKeys
        dispatch({
          type: 'jobConfig/updateState',
          payload: {
            zk: zkNew,
          },
        })
      },
    },
  }

  //  modal组件默认确认取消事件，如果想修改需要重新定义事件
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <ServerList {...listProps} />
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  type: PropTypes.string,
  zk: PropTypes.object,
  onSelectOk: PropTypes.func,
}

export default Form.create()(modal)
