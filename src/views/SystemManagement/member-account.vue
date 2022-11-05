<template>
  <div class="user-list-wrap">
    <ProForm ref="formRef" :inline="true" :columns="formColumns">
      <template #submitSlot>
        <el-form-item>
          <el-button type="primary" @click="search" :loading="listLoading">查询</el-button>
        </el-form-item>
      </template>
    </ProForm>
    <div class="">
      <el-button type="primary" @click="add()" icon="Plus"> 新增用户 </el-button>
    </div>
    <Table
      class="mt-20"
      :data="state.recordList"
      v-loading="listLoading"
      :columns="state.columns"
      :total="state.total"
      :pageSize="state.pageSize"
      :current="state.current"
      :pageUpdate="pageUpdate"
      :sizeUpdate="sizeUpdate"
    >
      <template #status1="{ row }">
        <el-tag v-if="row.status === '1'" type="success">正常</el-tag>
        <el-tag v-else type="info">锁定</el-tag>
      </template>
      <template #action="{ row }">
        <el-button type="primary" size="small" plain icon="View" @click="showDia(row, true, 'view', '查看用户')">
          详情
        </el-button>
        <el-button type="primary" size="small" plain icon="Edit" @click="showDia(row, false, 'edit', '修改用户')">
          修改
        </el-button>
        <el-button type="danger" size="small" plain icon="Document" @click="deleteAddress(row)"> 删除 </el-button>
      </template>
    </Table>

    <el-dialog v-model="checkDia" :title="title[state.type]" width="600px" center @close="close">
      <UserForm
        ref="userref"
        type="state.type"
        :isAdd="state.title !== '新增用户'"
        :isView="state.isView"
        :itemData="state.itemData"
        :isClosed="state.isClosed"
        @cancle="checkDia = false"
        @success="successFn"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue'
import { useRequest } from 'ahooks-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Table from '@/components/ProTable/index.vue'
import ProForm from '@/components/ProForm/index.vue'
import UserForm from './components/UserForm.vue'
import { systemuser, systemuseredit, systemuserdelete } from '@/api/SystemManagement'

const title = {
  add: '新增用户',
  view: '用户详情',
  edit: '编辑用户',
}
const state = reactive({
  formRef: null,
  formColumns: [
    {
      type: 'input',
      prop: 'username',
      label: '用户账号',
      placeholder: '请输入用户账号',
    },
    {
      type: 'input',
      prop: 'username',
      label: '用户姓名',
      placeholder: '请输入用户姓名',
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
      slot: 'submitSlot',
    },
  ],
  recordList: [],
  columns: [
    { type: 'selection' },
    { prop: 'userId', label: '用户ID' },
    { prop: 'mobile', label: '用户账号' },
    { prop: 'username', label: '用户姓名' },
    { prop: 'deptName', label: '所属部门', width: 140 },
    { prop: 'email', label: '电子邮箱', width: 180, showOverflowTooltip: true },
    { prop: 'roleName', label: '角色' },
    { prop: 'status', label: '账号状态', formatter: row => row.status * 1, slot: 'status1' },
    { label: '操作', fixed: 'right', slot: 'action', width: 240 },
  ],
  total: 0,
  query: {
    limit: 10,
    page: 1,
    username: '',
    status: '',
  },
  title: '',
  type: 'add',
  checkDia: false,
  isView: false,
  isClosed: false,
  itemData: null,
})
const { formRef, formColumns, checkDia, checkForm, checkFormRef } = toRefs(state)
const userref = ref(null)

const { run: listRun, loading: listLoading } = useRequest(() => systemuser(state.query), {
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
  state.query.limit = val
  listRun()
}

function search() {
  console.log(formRef.value.data)
  state.query.username = formRef.value.data.username
  if (formRef.value.data.status === '-1') {
    delete state.query.status
  } else {
    state.query.status = formRef.value.data.status
  }
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
  checkFormRef.value.validate(valid => {
    console.log(valid)
  })
}

function showDia(row, bol, type) {
  state.itemData = row
  state.type = type
  state.isView = bol
  checkDia.value = true
}

const { run: editRun } = useRequest(systemuseredit, {
  manual: true,
  onSuccess() {},
})
function changeRow(row) {
  console.log(row)
  // editRun({ status: row.status })
  editRun({
    status: row.status,
    userId: row.userId,
    roleId: row.roleId,
    username: row.username,
    deptId: row.deptId,
    deptName: row.deptName,
  })
}

function successFn() {
  checkDia.value = false
  state.query.page = 1
  listRun()
}

function close() {
  console.log(userref.value)
  state.isClosed = true
}

const { run: deleteRun } = useRequest(systemuserdelete, {
  manual: true,
  onSuccess() {
    ElMessage.success('删除成功')
    state.query.page = 1
    listRun()
  },
})

function deleteAddress(row) {
  ElMessageBox.confirm('确定删除该条数据？')
    .then(() => {
      deleteRun({ userIds: row.userId })
    })
    .catch(() => {
      // catch error
    })
}

function add() {
  state.type = 'add'
  state.itemData = null
  state.checkDia = true
  state.isView = false
  state.title = '新增用户'
}
</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
