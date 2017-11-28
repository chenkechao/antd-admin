import React from 'react'
import PropTypes from 'prop-types'
import { request } from 'utils'
import { Form, Input, Modal, Button } from 'antd'
import ServerList from './ServerList'

const modal = ({
  serverList,
  onSelectOk,
  dispatch,
  loading,
  ...modalProps
}) => {
  //let selectedRowKeys = null

  //  const { pageSize } = pagination
  const handleOk = () => {
    onSelectOk()
  }

  const listProps = {
    dataSource: serverList,
    //  loading: loading.effects['jobConfig/searhMachine'],
    rowSelection: {
      onChange: (keys) => {
        dispatch({
          type: 'jobConfig/updateState',
          payload: {
            selectedServerKeys: keys,
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
  serverList: PropTypes.array,
  onSelectOk: PropTypes.func,
}

export default Form.create()(modal)
