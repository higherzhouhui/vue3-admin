<template>
  <div class="user-list-wrap">
    <!-- <yu-layout>
      <template #head> -->
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="用户账号">
        <el-input v-model="state.formInline.user" placeholder="请输入查询的账号" />
      </el-form-item>
      <el-form-item label="用户层级">
        <el-input v-model="state.formInline.user" placeholder="请输入用户层级" />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="state.formInline.user" placeholder="请选择审核状态">
          <el-option label="待审核" value="shanghai" />
          <el-option label="审核通过" value="beijing" />
          <el-option label="审核驳回" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="更新类型">
        <el-select v-model="state.formInline.user" placeholder="请选择更新类型">
          <el-option label="更新手机号码" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="state.formInline.use"
          type="datetimerange"
          format="YYYY-MM-DD HH:mm:ss"
          range-separator="-"
          start-placeholder="选择开始日期"
          end-placeholder="选择结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
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
        <el-button type="primary" size="small" plain icon="Document" @click="checkDia = true"> 审核 </el-button>
        <el-button type="primary" size="small" plain icon="Document" @click="deleteAddress(row)"> 删除 </el-button>
      </template>
    </Table>
    <el-dialog v-model="checkDia" title="审核" width="30%">
      <el-form :model="checkForm" ref="checkFormRef">
        <el-form-item prop="reason" label="用户账号">
          <el-input v-model="checkForm.reason" disabled />
        </el-form-item>
        <el-form-item prop="reason" label="更新类型">
          <el-input v-model="checkForm.reason" disabled />
        </el-form-item>
        <el-form-item prop="reason" label="新手机号">
          <el-input v-model="checkForm.reason" disabled />
        </el-form-item>
        <el-form-item label="审核状态" prop="reason">
          <el-radio-group v-model="checkForm.isChecked" prop="isChecked">
            <el-radio label="通过" />
            <el-radio label="拒绝" />
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="reason" label="备注">
          <el-input v-model="checkForm.reason" :rows="2" type="textarea" placeholder="请输入原因" />
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="cancelDia">取消</el-button>
          <el-button type="primary" size="medium" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import Table from '@/components/ProTable/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
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
    { prop: 'phone', label: '手机号' },
    { prop: 'name', label: '类型' },
    { prop: 'name', label: '状态' },
    { prop: 'status', label: '备注' },
    { prop: 'type', label: '创建时间' },
    { prop: 'type', label: '创建人' },
    { prop: 'type', label: '审核时间' },
    { prop: 'type', label: '审核人' },
    { label: '操作', field: 'right', width: 180, slot: 'action' },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    user: '',
    region: '',
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
function deleteAddress(row) {
  handleClose()
}
const handleClose = done => {
  ElMessageBox.confirm('确定删除该条数据？')
    .then(() => {
      ElMessage.success('删除成功')
      done()
    })
    .catch(() => {
      // catch error
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
