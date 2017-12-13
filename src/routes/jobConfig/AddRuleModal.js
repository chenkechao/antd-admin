import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Button } from 'antd'
import MappingList from './MappingList'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onAddRuleOk,
  onAddMapping,
  dispatch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onAddRuleOk(data)
    })
  }

  const listProps = {
    dataSource: item.mapping,
    pagination: false,
    onDeleteItem (id) {
      dispatch({
        type: 'jobConfig/delete',
        payload: id,
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

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="规则名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('rule', {
            initialValue: item.rule,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="数据库列表" hasFeedback {...formItemLayout}>
          {getFieldDecorator('db', {
            initialValue: item.db,
            rules: [
              {
                required: true,
                pattern: /,+/,
                message: '数据库每项必须用，号隔开',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
      <Button size="large" type="ghost" onClick={onAddMapping}>添加mapping</Button>
      <MappingList {...listProps} />
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onAddRuleOk: PropTypes.func,
  onAddMapping: PropTypes.func,
  dispatch: PropTypes.func,
}

export default Form.create()(modal)
