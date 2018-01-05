import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,Select  } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

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
  // 编辑进来时,jobId默认置灰
  let isDisabled = null
  if (item.jobId != null) {
    isDisabled = true
  }

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      console.log(data)
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
          })(<Input placeholder="job-127.0.0.1" disabled={isDisabled} />)}
        </FormItem>
        <FormItem label="ip" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.ip', {
            initialValue: item.instance.ip,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="127.0.0.1" />)}
        </FormItem>
        <FormItem label="port" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.port', {
            initialValue: item.instance.port,
            rules: [
              {
                required: true,
                pattern: /^\d{1,9}$/,
                message: '必须为数字',
              },
            ],
          })(<Input placeholder="3306" />)}
        </FormItem>
        <FormItem label="userName" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.userName', {
            initialValue: item.instance.userName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="root" />)}
        </FormItem>
        <FormItem label="password" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.password', {
            initialValue: item.instance.password,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="123456" />)}
        </FormItem>
        <FormItem label="gtid" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.gtid', {
            initialValue: item.instance.gtid,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="" />)}
        </FormItem>
        <FormItem label="serverId" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instance.serverId', {
            initialValue: item.instance.serverId,
            rules: [
              {
                required: true,
                pattern: /^\d{1,9}$/,
                message: '必须为数字',
              },
            ],
          })(<Input placeholder="81001" />)}
        </FormItem>
        <FormItem label="type"  hasFeedback {...formItemLayout}>
          {getFieldDecorator('message.type', {
            initialValue: item.message.type != null ? item.message.type : 'kafka',
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select defaultValue="kafka" style={{ width: 200 }}>
              <Option value="kafka">kafka</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="connector" hasFeedback {...formItemLayout}>
          {getFieldDecorator('message.connector', {
            initialValue: item.message.connector != null ? item.message.connector : null,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="10.9.35.69:9092" />)}
        </FormItem>
        <FormItem label="rules" style={{ display: 'none' }} hasFeedback {...formItemLayout}>
          {getFieldDecorator('rules', {
            initialValue: item.rules != null ? item.rules : null,
          })(<Input style={{ display: 'none' }} />)}
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
