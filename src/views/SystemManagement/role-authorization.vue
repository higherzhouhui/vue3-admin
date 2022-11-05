<template>
  <div class="user-list-wrap">
    <ProForm
      ref="formRef"
      :inline="true"
      :columns="formColumns"
    >
      <template #submitSlot>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
          >查询</el-button>
        </el-form-item>
      </template>
    </ProForm>
    <div class="">
      <el-button
        type="primary"
        @click="$router.push({name: 'roleAuthorizationForm'})"
        icon="Plus"
      >
        新增角色权限
      </el-button>
    </div>
    <Table
      class="mt-20"
      :data="state.recordList"
      :columns="state.columns"
      :total="state.total"
      :pageSize="state.pageSize"
      :current="state.current"
      :pageUpdate="pageUpdate"
      :sizeUpdate="sizeUpdate"
    >
      <template #status1="{ row }">
        <el-switch v-model="row.status" />
      </template>
      <template #status2="{ row }">
        <el-switch v-model="row.status" />
      </template>
      <template #action="{ row }">
        <el-button
          type="primary"
          size="small"
          plain
          icon="View"
          @click="showDia(row,true)"
        >
          详情
        </el-button>
        <el-button
          type="primary"
          size="small"
          plain
          icon="Edit"
          @click="showDia(row,false)"
        >
          修改
        </el-button>
      </template>
    </Table>

    <el-dialog
      v-model="checkDia"
      title="新增角色权限"
      width="600px"
      center
    >
      <RoleForm
        :isView="state.isView"
        @cancle="checkDia=false"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useRequest } from 'ahooks-vue'
import Table from '@/components/ProTable/index.vue'
import ProForm from '@/components/ProForm/index.vue'
import RoleForm from './components/RoleForm.vue'
import { systemrole } from '@/api/SystemManagement'
import { formatTime } from '@/utils/index'

const state = reactive({
  formRef: null,
  formColumns: [
    {
      type: 'select',
      prop: 'status',
      label: '角色',
      list: [
        { value: '-1', label: '全部' },
        { value: '0', label: '超级管理员' },
        { value: '1', label: '管理员' },
        { value: '2', label: '产品经理' },
        { value: '3', label: '客服' },
      ],
      placeholder: '请选择',
      defaultValue: '-1',
    },
    {
      type: 'select',
      prop: 'status',
      label: '所属部门',
      list: [
        { value: '-1', label: '全部' },
        { value: '0', label: '互联网产品部' },
        { value: '1', label: '产品运营部' },
        { value: '2', label: '研发部' },
        { value: '3', label: '客服部' },
      ],
      placeholder: '请选择',
      defaultValue: '-1',
    },
    {
      slot: 'submitSlot'
    }
  ],
  recordList: [],
  columns: [
    { type: 'selection' },
    { prop: 'roleName', label: '角色名称' },
    { prop: 'level', label: '所属部门' },
    { prop: 'name', label: '用户数' },
    { prop: 'createTime', label: '创建时间', formatter: (row) => formatTime(row.createTime) ?? '' },
    { prop: 'authLevel', label: '角色权限开关', slot: 'status1' },
    { label: '操作', fixed: 'right', slot: 'action', width: 180 }
  ],
  total: 30,
  query: {
    limit: 5,
    page: 1,
    rolename: ''
  },
  formInline: {
    user: '',
    region: '',
    date: ''
  },
  checkDia: false,
  isView: false
})
const { formRef, formColumns, checkDia, checkForm, checkFormRef } = toRefs(state)

const { run: listRun, loading: listLoading } = useRequest(() => systemrole(state.query), {
  onSuccess(res) {
    state.recordList = res.list
    state.total = res.total
  }
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
  state.query.rolename = formRef.value.data.rolename
  state.query.page = 1
  listRun()
}

function resetForm() {
  console.log(checkFormRef.value)
  checkFormRef.value.resetFields()
}

function cancelDia() {
  resetForm()
  checkDia.value = false
}

function submitForm() {
  checkFormRef.value.validate((valid) => {
    console.log(valid)
  })
}

function showDia(row, bol) {
  state.isView = bol
  checkDia.value = true
}

</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
