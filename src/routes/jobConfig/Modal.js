import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

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
  onOk,
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
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="jobId" hasFeedback {...formItemLayout}>
          {getFieldDecorator('jobId', {
            initialValue: item.jobId,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="ip" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.ip', {
            initialValue: item.instance.ip,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="port" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.port', {
            initialValue: item.instance.port,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="userName" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.userName', {
            initialValue: item.instance.userName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="password" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.password', {
            initialValue: item.instance.password,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="gtid" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.gtid', {
            initialValue: item.instance.gtid,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="serverId" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.serverId', {
            initialValue: item.instance.serverId,
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
  onOk: PropTypes.func,
}

export default Form.create({})(modal)
