/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { createConfig, deleteConfig, updateConfig } from 'services/jobConfig'
import { createRule } from 'services/ruleConfig'
import * as jobConfigService from 'services/jobConfigs'
import { pageModel } from './common'

const { query } = jobConfigService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'jobConfig',

  state: {
    currentItem: {},
    currentItemMapping: {},
    modalVisible: false,
    addRuleModalVisible: false,
    addMappingModalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    selectedServerKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    rule: {
      currentItemRule: {},
      ruleModalVisible: false,
      mappingList: [],
      selectRow: [], // 代表选择哪条rule
    },
    zk: {
      serverList: [],
      selectServerModalVisible: false,
      jobStatusList: [],
      jobStatusModalVisible: false,
    },
    // jobId: 'ordercenter-27',
    // instance: {
    //   ip: '192.168.1.27',
    //   port: 3306,
    //   userName: 'ztorder',
    //   password: 'Hzord8911#^&',
    //   gtid: '',
    //   serverId: 80001,
    // },
    // rules: [{
    //   rule: 'regex',
    //   db: ['orderdb_02', 'orderdb_03'],
    //   mapping: [{
    //     table: 'order_replica',
    //     logical_table: 'order_replica',
    //     topic: 'aries_order_replica',
    //     key: '',
    //   }, {
    //     table: 'order_1',
    //     logical_table: 'order',
    //     topic: 'aries_order',
    //     key: '',
    //   }, {
    //     table: 'order_0',
    //     logical_table: 'order',
    //     topic: 'aries_order',
    //     key: '',
    //   }, {
    //     table: 'preorder_0',
    //     logical_table: 'preorder',
    //     topic: 'aries_preorder',
    //     key: '',
    //   }, {
    //     table: 'entry_order',
    //     logical_table: 'entry_order',
    //     topic: 'aries_entry_order',
    //     key: '',
    //   }],
    //
    // }],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/jobConfig') {
          const payload = location.query || { current: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
    * deleteConfig ({ payload }, { call, put, select }) {
      const data = yield call(deleteConfig, payload )
      //  const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        //  yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(jobConfigService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * createConfig ({ payload }, { call, put }) {
      const data = yield call(createConfig, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * updateConfig ({ payload }, { select, call, put }) {
      // const id = yield select(({ user }) => user.currentItem.id)
      // const newUser = { ...payload, id }
      const data = yield call(updateConfig, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * createRule ({ payload }, { call, put }) {
      const data = yield call(createRule, payload)
      if (data.success) {
        yield put({ type: 'hideRuleModal' })
        yield put({ type: 'hideAddRuleModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * searhMachine ({ payload }, { call, put }) {
      const data = yield call(jobConfigService.searhMachine, payload)
      if (data.success) {
        const zk = {
          serverList: data.rows,
          selectServerModalVisible: true,
        }
        yield put({ type: 'showSelectServerModal', payload: { zk } })
      } else {
        throw data
      }
    },

    * registerZk ({ payload }, { call, put }) {
      console.log(payload);
      const data = yield call(jobConfigService.registerZk, payload)
      if (data.success) {
        yield put({ type: 'hideSelectServerModal' })
      } else {
        throw data
      }
    },

    * jobStatus ({ payload }, { call, put }) {
      const data = yield call(jobConfigService.searhJobOpearte, payload)
      if (data.success) {
        const zk = {
          jobStatusList: data.rows,
          jobStatusModalVisible: true,
        }
        yield put({ type: 'showJobStatusModal', payload: { zk } })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

    showRuleModal (state, { payload }) {
      state.rule.ruleModalVisible = true
      return { ...state, ...payload }
    },
    hideRuleModal (state) {
      state.rule.ruleModalVisible = false
      return { ...state }
    },

    showAddRuleModal (state, { payload }) {
      return { ...state, ...payload, addRuleModalVisible: true }
    },
    hideAddRuleModal (state) {
      return { ...state, addRuleModalVisible: false }
    },

    showAddMappingModal (state, { payload }) {
      return { ...state, ...payload, addMappingModalVisible: true }
    },
    hideAddMappingModal (state) {
      return { ...state, addMappingModalVisible: false, modalType: 'createRule' }
    },
    showSelectServerModal (state, { payload }) {
      //  state.zk.selectServerModalVisible = true
      return { ...state, ...payload }
    },
    hideSelectServerModal (state) {
      state.zk.selectServerModalVisible = false
      return { ...state }
    },
    showJobStatusModal (state, { payload }) {
      //  state.zk.jobStatusModalVisible = true
      return { ...state, ...payload }
    },
    hideJobStatusModal (state) {
      state.zk.jobStatusModalVisible = false
      return { ...state }
    },
  },
})
