<template>
  <div class="user-list-wrap">
    <div class="titles">代理佣金调整明细</div>
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="代理账号:" class="form-items-body">
        <el-input clearable v-model="state.formInline.agentAccount" placeholder="请输入代理账号" class="form-items" />
      </el-form-item>

      <el-form-item label="调整原因:" class="form-items-body">
        <el-select v-model="state.formInline.modifyType" class="m-2 form-items" clearable placeholder="请选择调整原因">
          <el-option label="补发佣金" :value="1" />
          <el-option label="扶持调整" :value="2" />
          <el-option label="其他调整" :value="3" />
        </el-select>
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
        <template #reason="{ row }">
          <div>
            {{
              row.modifyType === 1
                ? '补发佣金'
                : row.modifyType === 2
                ? '扶持调整'
                : row.modifyType === 3
                ? '其他调整'
                : ''
            }}
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue'
import Table from '@/components/ProTable/index.vue'
import { commissionModifyRecord } from '@/api/reportForm/reportForm'
const state = reactive({
  recordList: [],
  columns: [
    { prop: 'agentAccount', label: '代理账号' },
    { prop: 'modifyAmt', label: '调整金额' },
    { prop: 'agentType', label: '调整原因', slot: 'reason' },
    { prop: 'createTime', label: '调整时间' },
    { prop: 'modifyMonth', label: '调整月份' },
    { prop: 'modifyUserName', label: '操作人' },
  ],
  total: 0,
  pageSize: 10,
  current: 1,
  formInline: {},
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

onMounted(() => {
  commissionModifyRecordData()
})
const commissionModifyRecordData = () => {
  commissionModifyRecord(state.formInline).then(item => {
    if (item.code === 200) {
      state.recordList = item.rows
      state.total = item.total
    }
    console.log(item)
  })
}

// 查询
const query = () => {
  commissionModifyRecordData()
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
    if (index === 1 || index === 3 || index === 4) {
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
