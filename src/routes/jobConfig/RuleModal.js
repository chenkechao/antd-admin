import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Button } from 'antd'
import RuleList from './RuleList'

const modal = ({
  item = {},
  onAddRule,
  dispatch,
  onRuleOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  //  const { pageSize } = pagination
  const handleOk = () => {
    onRuleOk()
  }

  const ruleListProps = {
    dataSource: item.rules,
    //  loading: loading.effects['jobConfig/query'],
    //  pagination,
    onDeleteItem (id) {
      dispatch({
        type: 'jobConfig/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      console.log('fdas')
      dispatch({
        type: 'jobConfig/showAddRuleModal',
        payload: {
          modalType: 'updateRule',
          currentItemRule: item,
        },
      })
    },
    rowSelection: {
      //  selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'jobConfig/updateState',
          payload: {
            selectedRowKeys: keys,
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
      <Button size="large" type="ghost" onClick={onAddRule}>添加规则</Button>
      <RuleList {...ruleListProps} />
    </Modal>
  )
}

modal.propTypes = {
  onAddRule: PropTypes.func,
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onRuleOk: PropTypes.func,
  dispatch: PropTypes.func,
}

export default Form.create()(modal)
