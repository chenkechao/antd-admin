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
    dataSource: currentItemRule.mapping,
    pagination: false,
    useFixedHeader: true, // 固定表头
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
      //  selectedRowKeys,
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

  const cardProps = {
    title: currentItemRule.rule,
  }

  //  modal组件默认确认取消事件，如果想修改需要重新定义事件
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Button size="large" type="ghost" onClick={onAddRule}>添加规则</Button>
      <Button size="large" type="ghost" onClick={onAddMapping}>添加mapping</Button>
      {alertVisible && <Alert
        description="请先选择一条规则"
        type="error"
        showIcon
      />}
      <RuleList {...ruleListProps} />
      <Divider></Divider>
      <Card {...cardProps}>
        <MappingList {...mappingListProps} />
      </Card>
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
