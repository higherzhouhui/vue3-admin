<template>
  <div class="user-list-wrap">
    <div class="titles">平台费报表</div>
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="代理账号:" class="form-items-body">
        <el-input clearable v-model="state.formInline.agentAccount" placeholder="请输入代理账号" class="form-items" />
      </el-form-item>
      <el-form-item label="上级账号:" class="form-items-body">
        <el-input clearable v-model="state.formInline.parentAgent" placeholder="请输入上级账号" class="form-items" />
      </el-form-item>
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
      <!-- <Table
        :data="state.recordList"
        :columns="state.columns"
        :total="state.total"
        :pageSize="state.pageSize"
        :current="state.current"
        :pageUpdate="pageUpdate"
        :sizeUpdate="sizeUpdate"
      >
      </Table> -->
      <el-table :data="state.recordList">
        <el-table-column prop="agentAccount" label="代理账号" width="150" />
        <el-table-column prop="month" label="统计日期" width="150" />
        <el-table-column prop="demo1" label="输赢金额" min-width="150" align="center">
          <el-table-column prop="体育1" label="体育"></el-table-column>
          <el-table-column prop="棋牌1" label="棋牌"></el-table-column>
          <el-table-column prop="真人1" label="真人"></el-table-column>
          <el-table-column prop="彩票1" label="彩票"></el-table-column>
          <el-table-column prop="捕鱼1" label="捕鱼"></el-table-column>
          <el-table-column prop="电子1" label="电子"></el-table-column>
          <el-table-column prop="demo5" label="合计"></el-table-column>
        </el-table-column>
        <el-table-column prop="demo2" label="平台费率" min-width="150" align="center">
          <el-table-column prop="体育2" label="体育"></el-table-column>
          <el-table-column prop="棋牌2" label="棋牌"></el-table-column>
          <el-table-column prop="真人2" label="真人"></el-table-column>
          <el-table-column prop="彩票2" label="彩票"></el-table-column>
          <el-table-column prop="捕鱼2" label="捕鱼"></el-table-column>
          <el-table-column prop="电子2" label="电子"></el-table-column>
        </el-table-column>

        <el-table-column prop="demo3" label="平台费" min-width="150" align="center">
          <el-table-column prop="体育3" label="体育"></el-table-column>
          <el-table-column prop="棋牌3" label="棋牌"></el-table-column>
          <el-table-column prop="真人3" label="真人"></el-table-column>
          <el-table-column prop="彩票3" label="彩票"></el-table-column>
          <el-table-column prop="捕鱼3" label="捕鱼"></el-table-column>
          <el-table-column prop="电子3" label="电子"></el-table-column>
          <el-table-column prop="demo6" label="合计"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue'
import Table from '@/components/ProTable/index.vue'
import { gamePlatformStatis } from '@/api/reportForm/reportForm'
const state = reactive({
  recordList: [],
  columns: [
    { prop: 'month', label: '月份' },
    { prop: 'level', label: '平台名称' },
    { prop: 'name', label: '平台费率' },
    { prop: 'mobile', label: '输赢金额' },
    { prop: 'mobile2', label: '平台费' },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    agentAccount: null,
    parentAgent: null,
    month: null,
  },
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

onMounted(() => {
  gamePlatformStatisData()
})
const gamePlatformStatisData = () => {
  gamePlatformStatis(state.formInline).then(item => {
    if (item.code === 200) {
      state.total = item.total
      // state.recordList = item.rows
      let data = []
      item.rows.forEach((value, index) => {
        console.log('33', value)
        let a = { agentAccount: value.agentAccount, month: value.month, demo5: 0, demo6: 0 }
        value.gamePlatformVOList.forEach((value_1, index_1) => {
          a = {
            ...a,
            [`${value_1.gameTypeName}1`]: value_1.totalProfit,
            [`${value_1.gameTypeName}2`]: value_1.platformRatio,
            [`${value_1.gameTypeName}3`]: value_1.platformAmt,
          }
          a.demo5 += value_1.totalProfit
          a.demo6 += value_1.platformAmt
        })
        data = [...data, a]
      })
      console.log(data)

      state.recordList = data
    }
    console.log(item)
  })
}

// 查询
const query = () => {
  gamePlatformStatisData()
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
