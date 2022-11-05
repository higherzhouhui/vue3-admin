<template>
  <div class="user-list-wrap">
    <ProForm ref="formRef" :inline="true" :columns="formColumns">
      <template #submitSlot>
        <el-form-item>
          <el-button type="primary" @click="search" :loading="listLoading">查询</el-button>
        </el-form-item>
      </template>
    </ProForm>
    <Table
      :data="state.recordList"
      v-loading="listLoading"
      :columns="state.columns"
      :total="state.total"
      :pageSize="state.query.limit"
      :current="state.query.page"
      :pageUpdate="pageUpdate"
      :sizeUpdate="sizeUpdate"
    />
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useRequest } from 'ahooks-vue'
import Table from '@/components/ProTable/index.vue'
import ProForm from '@/components/ProForm/index.vue'
import { sytemlog } from '@/api/SystemManagement'
import { formatTime } from '@/utils/index'

const state = reactive({
  formRef: null,
  formColumns: [
    {
      type: 'input',
      prop: 'username',
      label: '操作人员',
      placeholder: '请输入操作人姓名',
    },
    {
      type: 'date-picker-range',
      prop: 'time',
      label: '操作时间',
      maxlength: '20',
      'start-placeholder': '选择开始日期',
      'end-placeholder': '选择结束日期',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    {
      slot: 'submitSlot',
    },
  ],
  recordList: [],
  columns: [
    { type: 'selection' },
    { prop: 'id', label: '编号' },
    { prop: 'username', label: '操作人员' },
    { prop: 'username', label: '所属部门' },
    { prop: 'ip', label: 'IP地址', width: 140 },
    { prop: 'createTime', label: '操作时间', formatter: row => formatTime(row.createTime) ?? '' },
    { prop: 'params', label: '请求参数' },
    { prop: 'location', label: '请求地址' },
  ],
  total: 0,
  query: {
    limit: 5,
    page: 1,
    username: '',
    beginTime: '',
    endTime: '',
  },
})
const { formRef, formColumns, checkDia, checkForm, checkFormRef } = toRefs(state)

const { run: listRun, loading: listLoading } = useRequest(() => sytemlog(state.query), {
  onSuccess(res) {
    state.recordList = res.list
    state.total = res.total
  },
})

function pageUpdate(val) {
  state.query.page = val
  listRun()
}
function sizeUpdate(val) {
  console.log(val)
  state.query.limit = val
  listRun()
}

function search() {
  console.log(formRef.value.data)
  state.query.username = formRef.value.data.username
  state.query.beginTime = formRef.value.data.time ? formRef.value.data.time[0] : ''
  state.query.endTime = formRef.value.data.time ? formRef.value.data.time[1] : ''
  state.query.page = 1
  listRun()
}
</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
