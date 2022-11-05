<template>
  <div class="user-list-wrap">
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="用户账号">
        <el-input v-model="state.formInline.account" placeholder="请输入用户账号" />
      </el-form-item>
      <el-form-item label="用户层级">
        <el-input v-model="state.formInline.level" placeholder="请输入用户层级" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="state.formInline.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="state.formInline.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="实名审核状态">
        <el-select v-model="state.formInline.checkStatus" placeholder="请选择状态">
          <el-option label="待审核" value="shanghai" />
          <el-option label="已实名" value="shanghai" />
          <el-option label="已驳回" value="shanghai" />
          <el-option label="未实名" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="">
      <el-button type="primary" @click="checkDia = true">
        <svg-icon icon-class="list_btn_ic_examine" />
        审核
      </el-button>
      <el-button type="primary"> <svg-icon icon-class="list_btn_ic_export" />导出数据 </el-button>
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
      <template #status="{ row }">
        <el-switch v-model="row.status" />
      </template>
      <template #action="{ row }">
        <el-button
          type="primary"
          size="small"
          plain
          icon="Document"
          @click="$router.push(`/UserManagement/user-detail/${row.id}`)"
        >
          详情
        </el-button>
      </template>
    </Table>
    <el-dialog v-model="checkDia" title="审核信息" width="600px" center>
      <el-form :model="checkForm" ref="checkFormRef" label-width="100px">
        <el-form-item label="审核结果">
          <el-radio-group v-model="checkForm.isChecked" prop="isChecked">
            <el-radio label="审核通过" />
            <el-radio label="审核失败" />
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="reason" label="原因">
          <el-input v-model="checkForm.reason" :rows="4" type="textarea" placeholder="请输入原因" />
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="cancelDia">取消</el-button>
          <el-button type="primary" size="medium" @click="submitForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import Table from '@/components/ProTable/index.vue'
// import YuLayout from '@/components/YuLayout'

const state = reactive({
  recordList: [
    {
      id: 12,
      account: 'fhjdf',
      level: 2,
      name: 'sdfdf',
      mobile: '21334324324',
      email: '23434354@45',
      nick: 'aaa',
      type: '普通用户',
      authLevel: 1,
      checkStatus: '已认证',
      status: true,
    },
  ],
  columns: [
    { type: 'selection' },
    { prop: 'account', label: '用户账号' },
    { prop: 'level', label: '用户层级' },
    { prop: 'name', label: '姓名' },
    { prop: 'mobile', label: '手机号', width: 140 },
    { prop: 'email', label: '邮箱', width: 180, showOverflowTooltip: true },
    { prop: 'nick', label: '昵称' },
    { prop: 'type', label: '用户类型' },
    { prop: 'authLevel', label: '认证等级' },
    { prop: 'checkStatus', label: '实名审核状态', width: 140 },
    { prop: 'status', label: '账号状态', slot: 'status' },
    { label: '操作', fixed: 'right', slot: 'action' },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    account: '',
    level: '',
    mobile: '',
    email: '',
    checkStatus: '',
  },
  checkDia: false,
  checkFormRef: null,
  checkForm: {
    isChecked: false,
    reason: '',
  },
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

function pageUpdate(val) {}
function sizeUpdate(val) {}

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
</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
