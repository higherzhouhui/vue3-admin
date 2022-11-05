<template>
  <div class="user-list-wrap">
    <div class="titles">历史佣金计算明细</div>
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="查询时间" class="form-items-body">
        <el-date-picker
          v-model="state.formInline.mobile"
          type="date"
          placeholder="请选择查询时间"
          style="width: 200px"
        />
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
    },
  ],
  columns: [
    { prop: 'account', label: '订单号' },
    { prop: 'level', label: '开始日期' },
    { prop: 'name', label: '结束日期' },
    { prop: 'mobile', label: '取款信息' },
    { prop: 'email', label: '已结算佣金' },
    { prop: 'nick', label: '状态' },
    { prop: 'type', label: '订单时间' },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    mobile: '',
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
