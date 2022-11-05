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
      <el-form-item label="姓名">
        <el-input v-model="state.formInline.user" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="流水号">
        <el-input v-model="state.formInline.user" placeholder="请输入交易流水号" />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="state.formInline.use"
          type="datetimerange"
          format="YYYY-MM-DD HH:mm:ss"
          range-separator="-"
          start-placeholder="选择开始日期"
          end-placeholder="选择结束日期"
        />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="state.formInline.user" placeholder="请选择审核状态">
          <el-option label="待审核" value="BTC" />
          <el-option label="审核通过" value="ETH" />
          <el-option label="审核驳回" value="USDT" />
        </el-select>
      </el-form-item>
      <el-form-item label="划转币种">
        <el-select v-model="state.formInline.user" placeholder="请选择币种">
          <el-option label="BTC" value="BTC" />
          <el-option label="ETH" value="ETH" />
          <el-option label="USDT" value="USDT" />
          <el-option label="EOS" value="EOS" />
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
        <!-- @click="$router.push(`/UserManagement/transfer-record-detail/${row.id}`)" -->
        <el-button
          type="primary"
          size="small"
          plain
          icon="Document"
          @click="$router.push(`/UserManagement/transfer-record-detail/${row.id}`)"
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
        <el-form-item prop="reason" label="审核原因">
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
    { prop: 'mobile', label: '交易流水号', width: 200, showOverflowTooltip: true },
    { prop: 'email', label: '币种名称' },
    { prop: 'email', label: '钱包协议' },
    { prop: 'nick', label: '转账个数' },
    { prop: 'type', label: '发送地址(钱包地址)', width: 200, showOverflowTooltip: true },
    { prop: 'authLevel', label: '接收地址', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '到账时间' },
    { prop: 'status', label: '状态' },
    { label: '操作', field: 'right', slot: 'action' },
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
</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
