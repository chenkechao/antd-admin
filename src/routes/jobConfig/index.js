import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { request } from 'utils'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import RuleModal from './RuleModal'
import AddRuleModal from './AddRuleModal'
import AddMappingModal from './AddMappingModal'
import SelectServerModal from './selectServer/SelectServerModal'
import JobStatusModal from './jobStatus/JobStatusModal'

const JobConfig = ({ location, dispatch, jobConfig, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, currentItemMapping, modalVisible,
    addRuleModalVisible, addMappingModalVisible,
    modalType, isMotion, selectedRowKeys, zk, rule } = jobConfig
  const { pageSize } = pagination
  let modalItem = {}
  modalItem.instance = {}

  //  let ruleItem = {}


  const modalProps = {
    item: modalType === 'createConfig' ? modalItem : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['jobConfig/update'],
    title: `${modalType === 'createConfig' ? '新增配置' : '更新配置'}`,
    wrapClassName: 'vertical-center-modal',
    width: 800,
    onOk (data) {
      dispatch({
        type: `jobConfig/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'jobConfig/hideModal',
      })
    },
  }

  const ruleModalProps = {
    item: currentItem,
    visible: rule.ruleModalVisible,
    maskClosable: false,
    dispatch: dispatch,
    title: '规则配置',
    wrapClassName: 'vertical-center-modal',
    width: 1200,
    onAddRule (item) {
      modalItem = currentItem
      let ruleTemp = {}
      ruleTemp.mapping = []
      if (modalItem.rules == null) {
        modalItem.rules = []
      }
      modalItem.rules.push(ruleTemp)//  新插入个对象
      rule.currentItemRule = modalItem.rules[modalItem.rules.length - 1]
      dispatch({
        type: 'jobConfig/showAddRuleModal',
        payload: {
          modalType: 'createRule',
          rule: rule,
        },
      })
    },
    onRuleOk () {
      dispatch({
        type: 'jobConfig/hideRuleModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'jobConfig/hideRuleModal',
      })
    },
  }

  const addRuleModalProps = {
    //  item: modalType === 'createRule' ? ruleItem : currentItem,
    item: rule.currentItemRule,
    visible: addRuleModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['jobConfig/update'],
    title: `${modalType === 'createRule' ? '新增规则' : '更新规则'}`,
    wrapClassName: 'vertical-center-modal',
    width: 1200,
    onAddMapping (item) {
      console.log(rule.currentItemRule)
      dispatch({
        type: 'jobConfig/showAddMappingModal',
        payload: {
          modalType: 'createMapping',
          currentItemMapping: rule.currentItemRule,
        },
      })
    },
    onAddRuleOk (data) {
      currentItem.rules[currentItem.rules.length - 1].rule = data.rule
      //  db转换成数组
      currentItem.rules[currentItem.rules.length - 1].db = data.db.split(',')
      //  保存rule到后台
      // dispatch({
      //   type: 'jobConfig/hideAddRuleModal',
      // })
      dispatch({
        type: `jobConfig/${modalType}`,
        payload: currentItem,
      })
    },
    onCancel () {
      if (modalType === 'createRule') {
        //  取消时从数组删除
        currentItem.rules.pop()
      }
      dispatch({
        type: 'jobConfig/hideAddRuleModal',
      })
    },
  }

  const addMappingModalProps = {
    //  item: modalType === 'createMapping' ? modalItem : currentItem,
    item: currentItemMapping,
    visible: addMappingModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['jobConfig/update'],
    title: `${modalType === 'createMapping' ? '新增mapping' : '更新mapping'}`,
    wrapClassName: 'vertical-center-modal',
    width: 800,
    onAddMappingOk (data) {
      //  如果没有mapping数组先构建
      console.log(currentItemMapping)
      if (!currentItemMapping.hasOwnProperty('mapping')) {
        currentItemMapping.mapping = []
      }
      currentItemMapping.mapping.push(data)

      dispatch({
        type: 'jobConfig/hideAddMappingModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'jobConfig/hideAddMappingModal',
      })
    },
  }

  const selectServerModalProps = {
    serverList: zk.serverList,
    visible: zk.selectServerModalVisible,
    dispatch: dispatch,
    loading: loading,
    maskClosable: false,
    //  confirmLoading: loading.effects['jobConfig/update'],
    title: '选择服务器配置',
    wrapClassName: 'vertical-center-modal',
    width: 1200,
    onSelectOk () {
      //  TODO
      dispatch({
        type: 'jobConfig/hideSelectServerModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'jobConfig/hideSelectServerModal',
      })
    },
  }

  const jobStatusModalProps = {
    jobStatusList: zk.jobStatusList,
    visible: zk.jobStatusModalVisible,
    dispatch: dispatch,
    maskClosable: false,
    //  confirmLoading: loading.effects['jobConfig/update'],
    title: 'Job运行状态',
    wrapClassName: 'vertical-center-modal',
    width: 1200,
    onSelectOk () {
      //  TODO
      dispatch({
        type: 'jobConfig/hideJobStatusModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'jobConfig/hideJobStatusModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['jobConfig/query'],
    pagination,
    location,
    onSelectServer (item) {
      dispatch({
        type: 'jobConfig/searhMachine',
      })
    },
    onJobStatus (item) {
      dispatch({
        type: 'jobConfig/jobStatus',
      })
    },
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (item) {
      dispatch({
        type: 'jobConfig/deleteConfig',
        payload: item,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'jobConfig/showModal',
        payload: {
          modalType: 'updateConfig',
          currentItem: item,
        },
      })
    },
    //  选中其中一条配置规则
    onRuleConfig (item) {
      dispatch({
        type: 'jobConfig/showRuleModal',
        payload: {
          modalType: 'ruleConfig',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
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

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/jobConfig',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/jobConfig',
      }))
    },
    onAdd () {
      dispatch({
        type: 'jobConfig/showModal',
        payload: {
          modalType: 'createConfig',
        },
      })
    },

    switchIsMotion () {
      dispatch({ type: 'jobConfig/switchIsMotion' })
    },
  }

  // const handleDeleteItems = () => {
  //   dispatch({
  //     type: 'user/multiDelete',
  //     payload: {
  //       ids: selectedRowKeys,
  //     },
  //   })
  // }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {rule.ruleModalVisible && <RuleModal {...ruleModalProps} />}
      {addRuleModalVisible && <AddRuleModal {...addRuleModalProps} />}
      {addMappingModalVisible && <AddMappingModal {...addMappingModalProps} />}
      {zk.selectServerModalVisible && <SelectServerModal {...selectServerModalProps} />}
      {zk.jobStatusModalVisible && <JobStatusModal {...jobStatusModalProps} />}
    </Page>
  )
}

JobConfig.propTypes = {
  jobConfig: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ jobConfig, loading }) => ({ jobConfig, loading }))(JobConfig)
