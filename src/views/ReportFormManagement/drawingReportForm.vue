<template>
  <div class="user-list-wrap">
    <div class="titles">直属会员佣金报表</div>
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="代理账号:" class="form-items-body">
        <el-input clearable v-model="state.formInline.agentAccount" placeholder="请输入代理账号" class="form-items" />
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
      <Table
        :data="state.recordList"
        :columns="state.columns"
        :total="state.total"
        :pageSize="state.pageSize"
        :current="state.current"
        :pageUpdate="pageUpdate"
        :sizeUpdate="sizeUpdate"
        :summary-method="getSummaries"
        show-summary
      >
      </Table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue'
import Table from '@/components/ProTable/index.vue'
import { memberCommissionStatis } from '@/api/reportForm/reportForm'
const state = reactive({
  recordList: [
    {
      id: 12,
      account: 'fhjdf',
      level: 2,
      name: 'sdfdf',
      mobile: '21334324324',
      email: '23434354@45',
      email6: '1112',
    },
  ],
  columns: [
    { prop: 'month', label: '月份', width: 120 },
    { prop: 'agentAccount', label: '代理账号', width: 100 },
    { prop: 'newValidPerson', label: '本月新增有效会员数', width: 180 },
    { prop: 'totalBetAmt', label: '总投注额', width: 120 },
    { prop: 'totalBetValidAmt', label: '总投注有效流水', width: 180 },
    { prop: 'totalProfit', label: '总输赢金额', width: 120 },
    { prop: 'bonusAmt', label: '活动红利', width: 120 },
    { prop: 'platformAmt', label: '本月平台费', width: 120 },
    { prop: 'netProfitAmt', label: '本月净盈利', width: 120 },
    { prop: 'commissionRatio', label: '佣金比例', width: 120 },
    { prop: 'attachAmt', label: '扶持金额', width: 120 },
    { prop: 'modifyAmt', label: '调整金额', width: 120 },
    { prop: 'giftCommissionAmt', label: '本月打赏抽成', width: 120 },
    { prop: 'totalCommissionAmt', label: '本月佣金', width: 100 },
  ],
  total: 0,
  pageSize: 10,
  current: 1,
  formInline: {},

  selectTime: [
    {
      name: '今日',
      Check: true,
    },
    {
      name: '昨日',
      Check: false,
    },
    {
      name: '本周',
      Check: false,
    },
    {
      name: '上周',
      Check: false,
    },
    {
      name: '本月',
      Check: false,
    },
    {
      name: '上月',
      Check: false,
    },
  ],
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

onMounted(() => {
  memberCommissionStatisData()
})
const memberCommissionStatisData = () => {
  memberCommissionStatis(state.formInline).then(item => {
    if (item.code === 200) {
      state.recordList = item.rows
      state.total = item.total
    }
    console.log(item)
  })
}

// 查询
const query = () => {
  memberCommissionStatisData()
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

// 底部合计
const getSummaries = param => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '当前页汇总'
      return
    }
    // 不计算项
    if (index === 1 || index === 9) {
      sums[index] = '--'
      return
    }
    const values = data.map(item => Number(item[column.property]))
    if (!values.every(value => Number.isNaN(value))) {
      sums[index] = `${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = '--'
    }
  })

  return sums
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
