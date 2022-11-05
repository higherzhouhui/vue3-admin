<template>
  <div class="user-list-wrap">
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
      <el-form-item label="钱包地址">
        <el-input v-model="state.formInline.user" placeholder="请输入钱包地址" />
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
      <el-form-item label="币种">
        <el-select v-model="state.formInline.checkStatus" placeholder="请选择币种">
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
      <el-button type="primary" @click="refresh">
        <el-icon><Refresh /></el-icon>
        刷新收款记录
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
          @click="$router.push(`/userManagement/user-detail/${row.id}`)"
        >
          详情
        </el-button>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Table from '@/components/ProTable/index.vue'
// import YuLayout from '@/components/YuLayout'
import { ElMessage } from 'element-plus'
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
    { prop: 'mobile', label: '交易流水号', width: 240, showOverflowTooltip: true },
    { prop: 'email', label: '币种名称' },
    { prop: 'email', label: '钱包协议' },
    { prop: 'nick', label: '收款个数' },
    { prop: 'type', label: '发送地址', width: 240, showOverflowTooltip: true },
    { prop: 'authLevel', label: '接收地址(钱包地址)', width: 240, showOverflowTooltip: true },
    { prop: 'type', label: '到账时间' },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    user: '',
    region: '',
  },
})

function refresh() {
  ElMessage({
    showClose: true,
    message: '刷新成功，请耐心等待充币到账',
    type: 'success',
  })
}
function sizeUpdate(val) {}
</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
