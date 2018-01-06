import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Button, Card, Alert, Divider } from 'antd'
import RuleList from './RuleList'
import MappingList from './MappingList'

const modal = ({
  rule,
  item = {},
  onAddRule,
  onAddMapping,
  dispatch,
  onRuleOk,
  ...modalProps
}) => {
  let currentItemRule = rule.currentItemRule
  let selectRow = rule.selectRow
  let alertVisible = rule.alertVisible

  const handleOk = () => {
    onRuleOk()
  }

  const mappingListProps = {
    title: () => ('当前选中的规则名：' + currentItemRule.rule + ", 对应的mapping列表如下"),
    dataSource: currentItemRule.mapping,
    pagination: false,
    useFixedHeader: true, // 固定表头
    onDeleteItem (record) {
      currentItemRule.mapping.pop(record)
      let ruleNew = Object.assign({}, rule)// 克隆一个新的rule对象
      ruleNew.currentItemRule = currentItemRule
      dispatch({
        type: 'jobConfig/updateState',
        payload: {
          rule: ruleNew,
        },
      })
    },
    onEditItem (record) {
      dispatch({
        type: 'jobConfig/showAddMappingModal',
        payload: {
          modalType: 'updateMapping',
          currentItemMapping: record,
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

  const ruleListProps = {
    dataSource: item.rules,
    pagination: false,
    onDeleteItem (ruleName) {
      dispatch({
        type: 'jobConfig/deleteRule',
        payload: {
          ruleName: ruleName,
          jobId: item.jobId,
        },
      })
    },
    // 单击一列响应事件
    onRowClick (selectedRows, index, row) {
      if (selectRow.length > 0) {
        selectRow[0].bgColor = '#ffffff'
        selectRow.pop()
      }
      selectRow.push(row.currentTarget)
      row.currentTarget.bgColor = '#ECF6FD'
      let rule = {
        currentItemRule: selectedRows,
        ruleModalVisible: true,
        selectRow: selectRow,
      }
      dispatch({
        type: 'jobConfig/updateState',
        payload: {
          rule: rule,
        },
      })
    },
    onEditItem (item) {
      let rule = {
        currentItemRule: item,
        ruleModalVisible: true,
        selectRow: selectRow,
      }
      dispatch({
        type: 'jobConfig/showAddRuleModal',
        payload: {
          modalType: 'updateRule',
          rule: rule,
        },
      })
    },
    rowSelection: {
      selectedRowKeys:[currentItemRule.rule],
      onChange: (keys) => {
        // dispatch({
        //   type: 'jobConfig/updateState',
        //   payload: {
        //     selectedRowKeys: keys,
        //   },
        // })
        // let ruleList = item.rules
        // let ruleItem
        // for(var ruleItem in ruleList){
        //   if(ruleItem.id == keys){
        //
        //   }
        // }
        // mappingDataSource
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
      <div>
        <Button size="large" type="primary" onClick={onAddRule}>添加规则</Button>
        <Button size="large" type="primary" style={{ margin: '0px 16px' }} onClick={onAddMapping}>添加mapping</Button>
      </div>
      {alertVisible && <Alert
        description="请先选择一条规则"
        type="error"
        showIcon
      />}
      <RuleList {...ruleListProps} />
      <Divider></Divider>
      <MappingList {...mappingListProps} />
    </Modal>
  )
}

modal.propTypes = {
  rule: PropTypes.object,
  onAddRule: PropTypes.func,
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onRuleOk: PropTypes.func,
  dispatch: PropTypes.func,
  onAddMapping: PropTypes.func,
}

export default Form.create()(modal)
