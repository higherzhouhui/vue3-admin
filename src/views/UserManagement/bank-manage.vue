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
      <el-form-item label="银行卡号">
        <el-input v-model="state.formInline.user" placeholder="请输入银行卡号" />
      </el-form-item>
      <el-form-item label="银行卡户名">
        <el-input v-model="state.formInline.user" placeholder="请输入银行卡户名" />
      </el-form-item>
      <el-form-item label="所属银行">
        <el-select v-model="state.formInline.user" placeholder="请选择所属银行">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="">
      <el-button
        type="primary"
        @click="
          checkDia = true
        "
      >
        <el-icon><CirclePlus /></el-icon>
        添加
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
      <template #status="{ row }">
        <el-switch v-model="row.status" />
      </template>
      <template #action="{ row }">
        <el-button type="primary" size="small" plain icon="Document" @click="infoDia = true"> 查看 </el-button>
        <el-button
          type="primary"
          size="small"
          plain
          icon="Edit"
          @click="
            checkDia = true
          "
        >
          修改
        </el-button>
        <el-button type="primary" size="small" plain icon="Delete" @click="deleteAddress(row)"> 删除 </el-button>
      </template>
    </Table>
    <!-- </template>
    </yu-layout> -->
    <el-dialog v-model="checkDia" :title="checkDiaType === 'add' ? '添加' : '修改'" width="35%">
      <el-form :model="checkForm" ref="checkFormRef">
        <el-form-item prop="account" label="用户账号">
          <el-input v-model="checkForm.account" placeholder="请输入用户账号" :disabled="checkDiaType === 'edit'" />
        </el-form-item>
        <el-form-item prop="reason" label="银行户名">
          <el-input v-model="checkForm.reason" placeholder="请输入银行户名" />
        </el-form-item>
        <el-form-item prop="reason" label="银行卡号">
          <el-input v-model="checkForm.reason" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item prop="user" label="所属银行">
          <el-select v-model="checkForm.user" placeholder="请选择所属银行">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item prop="user" label="开户地址">
          <el-cascader v-model="checkForm.user" :options="bankOptions" @change="handleChange" />
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="cancelDia">取消</el-button>
          <el-button type="primary" size="medium" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="infoDia" title="查看" width="30%">
      <el-form :model="infoForm" ref="infoFormRef" disabled>
        <el-form-item prop="account" label="用户账号">
          <el-input v-model="infoForm.account" placeholder="请输入用户账号" />
        </el-form-item>
        <el-form-item prop="account" label="用户层级">
          <el-input type="number" v-model="infoForm.account" placeholder="请输入用户层级" />
        </el-form-item>
        <el-form-item prop="reason" label="银行户名">
          <el-input v-model="infoForm.reason" placeholder="请输入银行户名" />
        </el-form-item>
        <el-form-item prop="reason" label="银行卡号">
          <el-input v-model="infoForm.reason" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item prop="user" label="所属银行">
          <!-- <el-input v-model="infoForm.user" style="width: 86px;margin-right: 20px" disabled /> -->
          <el-select v-model="infoForm.user" placeholder="请选择钱包币种">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item prop="user" label="银行卡开户地址">
          <el-select v-model="checkForm.user" placeholder="请选择所属银行">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item prop="createTime" label="创建时间">
          <el-time-picker v-model="infoForm.createTime" format="YYYY-MM-DD HH:mm:ss" placeholder="请选择创建时间" />
        </el-form-item>
        <el-form-item prop="createTime" label="修改时间">
          <el-time-picker v-model="infoForm.createTime" format="YYYY-MM-DD HH:mm:ss" placeholder="请选择修改时间" />
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button size="medium" @click="cancelInfoDia">返回</el-button>
      </el-form-item>
    </el-dialog>
  </div>
</template>

<script setup>
// import { el } from 'element-plus/es/locale'
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
    { prop: 'level', label: '银行卡号' },
    { prop: 'name', label: '银行户名' },
    { prop: 'mobile', label: '开户地址' },
    { prop: 'email', label: '所属银行' },
    { prop: 'type', label: '修改时间' },
    { prop: 'authLevel', label: '修改人' },
    { label: '操作', field: 'right', slot: 'action', width: 250 },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    user: '',
    region: '',
  },
  checkDiaType: '',
  checkDia: false,
  checkFormRef: null,
  infoFormRef: null,
  checkForm: {
    account: '',
  },
  infoDia: false,
  infoForm: {
    account: '',
    createTime: '',
  },
})
const { checkDia, checkForm, checkFormRef, infoDia, infoForm, infoFormRef, checkDiaType } = toRefs(state)

function pageUpdate(val) {}
function sizeUpdate(val) {}
function handleChange(value) {
  console.log(value)
}
function resetForm() {
  console.log(checkFormRef.value)
  checkFormRef.value.resetFields()
}

function cancelDia() {
  resetForm()
  checkDia.value = false
}

function resetInfoForm() {
  console.log(infoFormRef.value)
  infoFormRef.value.resetFields()
}

function cancelInfoDia() {
  resetInfoForm()
  console.log(infoDia)
  infoDia.value = false
}

function submitForm() {
  checkFormRef.value.validate(valid => {
    console.log(valid)
    if (checkDiaType.value === 'add') {
      ElMessage.success('新增成功')
    } else if (checkDiaType.value === 'edit') {
      ElMessage.success('修改成功')
    }
    cancelDia()
  })
}

function deleteAddress(row) {
  handleClose()
}
const handleClose = done => {
  ElMessageBox.confirm('确定更新该条数据？')
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
