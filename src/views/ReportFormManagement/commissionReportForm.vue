<template>
  <div class="user-list-wrap">
    <div class="titles">代理佣金调整统计</div>
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
    <div style="padding: 12px; background: #fafafa; border-radius: 10px" v-loading="state.loading">
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
        maxHeight="calc(100vh - 360px)"
      >
      </Table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue'
import Table from '@/components/ProTable/index.vue'
import { commissionModifyStatis } from '@/api/reportForm/reportForm'
import steps from '../guide/steps';
const state = reactive({
  recordList: [],
  columns: [
    { prop: 'month', label: '月份' },
    { prop: 'agentAccount', label: '代理账号' },
    { prop: 'modifyAmt', label: '调整佣金' },
    { prop: 'updateTime', label: '最后处理时间' },
  ],
  total: 0,
  pageSize: 10,
  current: 1,
  formInline: {
    month: null,
  },
  loading: true,
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

onMounted(() => {
  commissionModifyStatisData()
})
const commissionModifyStatisData = () => {
  state.loading = true;
  commissionModifyStatis({
    ...state.formInline,
    pageNum: state.current,
    pageSize: state.pageSize,
  }).then(item => {
    if (item.code === 200) {
      state.recordList = item.rows
      state.total = item.total
    }
    state.loading = false;
    console.log(item)
  })
}

// 查询
const query = () => {
  commissionModifyStatisData()
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
    if (index === 1 || index === 3) {
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
function pageUpdate(val) {
  state.current = val;
  query();
}
function sizeUpdate(val) {
  state.pageSize = val;
  query();
}
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
