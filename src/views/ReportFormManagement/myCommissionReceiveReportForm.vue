<template>
  <div class="user-list-wrap">
    <div class="titles">我的佣金领取明细</div>
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="查询时间:" class="form-items-body">
        <el-date-picker
          v-model="state.formInline.month"
          type="month"
          placeholder="请选择时间"
          style="width: 200px"
          format="YYYY/MM"
          value-format="YYYY-MM"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="query" class="but" icon="Search">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="padding: 12px; background: #fafafa; border-radius: 10px">
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
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'
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
    },
  ],
  columns: [
    { prop: 'account', label: '订单号' },
    { prop: 'level', label: '取款信息' },
    { prop: 'name', label: '已结算佣金' },
    { prop: 'mobile', label: '状态' },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    email: null,
  },
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

// 查询
const query = () => {
  console.log(state.formInline)
}
// 点击切换
const Check = data => {
  console.log('这是什么数据', data)
  state.selectTime.forEach(item => {
    if (item.name === data.name) {
      item.Check = true
    } else {
      item.Check = false
    }
  })
}
function pageUpdate(val) {}
function sizeUpdate(val) {}
</script>

<style lang="scss" scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.displayf {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.displayf2 {
  display: flex;
  align-items: center;
}
.Check1 {
  width: 60px;
  height: 32px;
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #fff;
}
.Check2 {
  width: 60px;
  height: 32px;
  background: #f5f7fe;
  border-radius: 5px;
  border: none;

  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #333333;
  &:hover {
    background: #d3d4da;
    color: #514b4b;
  }
}
.but {
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 5px;
  border: none;
  width: 90px;
  height: 32px;
  color: #fff;
}
.form-items-body {
  margin-left: 20px;
  margin-right: 20px;
}
.titles {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  padding: 16px 0;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 15px;
}
.form-items {
  width: 200px !important;
}
</style>
