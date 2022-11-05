<template>
  <div>
    <Table
      class="mt-20"
      :data="state.recordList"
      :columns="state.columns"
      :total="state.total"
      :pageSize="state.pageSize"
      :current="state.current"
      :pageUpdate="pageUpdate"
      :sizeUpdate="sizeUpdate"
    />
  </div>
</template>

<script setup>
import { toRefs, reactive } from 'vue'
import Table from '@/components/ProTable/index.vue'

const state = reactive({
  recordList: [
    { id: 12, account: 'fhjdf', level: 2, name: 'sdfdf', mobile: '21334324324', email: '23434354@45', nick: 'aaa', type: '普通用户', authLevel: 1, checkStatus: '已认证', status: true }
  ],
  columns: [
    { type: 'selection' },
    { prop: 'account', label: '序号' },
    { prop: 'level', label: '日期' },
    { prop: 'name', label: '新增注册' },
    { prop: 'mobile', label: '新增活跃', width: 140 },
    { prop: 'email', label: '用户总量', width: 180, showOverflowTooltip: true },
    { prop: 'nick', label: '活跃人数' },
    { prop: 'type', label: '存款订单量', width: 140 },
    { prop: 'authLevel', label: '存款订单总额', width: 140 },
    { prop: 'checkStatus', label: '挂卖订单量', width: 140 },
    { prop: 'status', label: '挂卖成交量', width: 140 },
    { prop: 'status', label: '挂卖成交额', width: 140 },
    { prop: 'status', label: '挂买订单量', width: 140 },
    { prop: 'status', label: '挂买成交量', width: 140 },
    { prop: 'status', label: '挂买成交额', width: 140 },
    { prop: 'status', label: '转入订单量', width: 140 },
    { prop: 'status', label: '转入总额' },
    { prop: 'status', label: '转出订单量', width: 140 },
    { prop: 'status', label: '转出总额' }
  ],
  total: 30,
  pageSize: 15,
  current: 1
})

const { formRef, formColumns, checkDia, checkForm, checkFormRef } = toRefs(state)

function pageUpdate(val) {

}
function sizeUpdate(val) {

}

</script>

<style lang='scss' scoped>
</style>
