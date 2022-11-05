<template>
  <div class="user-list-wrap">
    <div class="titles">团队佣金统计报表</div>
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="代理账户" class="form-items-body">
        <el-input v-model="state.formInline.account" placeholder="请输入代理账户" class="form-items" clearable />
      </el-form-item>
      <el-form-item>
        <el-button class="but" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Table
      :data="state.recordList"
      :columns="state.columns"
      :total="state.total"
      :pageSize="state.pageSize"
      :current="state.current"
      :pageUpdate="pageUpdate"
      :sizeUpdate="sizeUpdate"
    >
    </Table>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import Table from '@/components/ProTable/index.vue'

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
      status1: '2022.10.19 13:48:34',
      status2: '2022.10.19 13:48:34',
      status3: '206.116.157.167',
    },
  ],
  columns: [
    { prop: 'account', label: '开始日期' },
    { prop: 'level', label: '结束日期' },
    { prop: 'name', label: '代理账号' },
    { prop: 'mobile', label: '存款人数' },
    { prop: 'email', label: '用户输赢' },
    { prop: 'nick', label: '净输赢' },
    { prop: 'type', label: '直属佣金' },
    { prop: 'authLevel', label: '团队佣金' },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    account: '',
  },
})

// 查询
const query = () => {
  console.log(state.formInline)
}
</script>

<style lang="scss" scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.but {
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 5px;
  border: none;
  width: 90px;
  height: 32px;
  color: #fff;
}
.form-items {
  width: 200px !important;
}
.form-items-body {
  margin-left: 20px;
  margin-right: 20px;
}
.titles {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  padding: 16px 0;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 15px;
}
</style>
