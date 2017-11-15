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
  onAddMappingOk,
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
            //initialValue: item.table,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="logical_table" hasFeedback {...formItemLayout}>
          {getFieldDecorator('logical_table', {
            //initialValue: item.logical_table,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="topic" hasFeedback {...formItemLayout}>
          {getFieldDecorator('topic', {
            //initialValue: item.topic,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="key" hasFeedback {...formItemLayout}>
          {getFieldDecorator('key', {
            //initialValue: item.key,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
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
