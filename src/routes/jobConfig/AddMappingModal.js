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
  itemMapping = {},
  onAddMappingOk,
  dispatch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  // 编辑进来时,table默认置灰
  let isDisabled = null
  if (itemMapping.table != null) {
    isDisabled = true
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        //  key: item.key,
      }
      onAddMappingOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="table" hasFeedback {...formItemLayout}>
          {getFieldDecorator('table', {
            initialValue: itemMapping.table,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="order_0" disabled={isDisabled} />)}
        </FormItem>
        <FormItem label="logical_table" hasFeedback {...formItemLayout}>
          {getFieldDecorator('logical_table', {
            initialValue: itemMapping.logical_table,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="order" />)}
        </FormItem>
        <FormItem label="topic" hasFeedback {...formItemLayout}>
          {getFieldDecorator('topic', {
            initialValue: itemMapping.topic,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="aries_binlog_order" />)}
        </FormItem>
        <FormItem label="columns" hasFeedback {...formItemLayout}>
          {getFieldDecorator('columns', {
            initialValue: itemMapping.columns,
            rules: [
              {
                pattern: /^\w+(,\w+)*$/,
                message: 'column每项必须用，号隔开',
              },
            ],
          })(<Input placeholder='id","name"' />)}
        </FormItem>
        <FormItem label="key" hasFeedback {...formItemLayout}>
          {getFieldDecorator('key', {
            initialValue: itemMapping.key,
          })(<Input placeholder="{table_l4}" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onAddMappingOk: PropTypes.func,
  dispatch: PropTypes.func,
}

export default Form.create()(modal)
