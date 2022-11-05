<template>
  <div class="user-list-wrap">
    <div class="titles">下级会员</div>
    <el-scrollbar>
      <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
        <el-form-item label="会员账户:" class="form-items-body">
          <el-input v-model="state.formInline.uid" placeholder="请输入会员账户" class="form-items" clearable />
        </el-form-item>
        <!-- <el-form-item label="上级代理:" class="form-items-body">
          <el-input v-model="state.formInline.account12" placeholder="请输入上级代理" class="form-items" clearable />
        </el-form-item> -->
        <!-- <el-form-item label="状态:" class="form-items-body">
          <el-select v-model="state.formInline.status" class="m-2 form-items" placeholder="请选择状态" clearable>
            <el-option value="1" label="全部"></el-option>
            <el-option value="2" label="冻结"></el-option>
            <el-option value="3" label="正常"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="注册时间:" class="form-items-body">
          <el-date-picker
            v-model="state.rangeTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 250px"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="query" class="but">查询</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
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
        <template #nick="{ row }">
          <div v-if="row.nick === '2'" class="normal">正常</div>
          <div v-if="row.nick === '3'" class="frozen">冻结</div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from 'vue'
import Table from '@/components/ProTable/index.vue'
import { getNumberList } from '@/api/agaentaccount';

const state = reactive({
  recordList: [],
  columns: [
    { prop: 'uid', label: '会员账户' },
    // { prop: 'level', label: '上级代理' },
    // { prop: 'agaentType', label: '会员类型' },
    { prop: 'lastDepositAmt', label: '最后存款金额' },
    { prop: 'firstDepositAmt', label: '首存金额' },
    // { prop: 'status', label: '状态', slot: 'nick' },
    { prop: 'createTime', label: '注册时间', width: 180 },
    { prop: 'lastLoginTime', label: '最后登录时间', width: 180 },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    uid: '',
    endDate: '',
    startDate: '',
  },
  checkDia: false,
  checkFormRef: null,
  checkForm: {
    uid: '',
    endDate: '',
    startDate: '',
  },
  checkDiaType: '',
  rangeTime: [],
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

// 查询
const query = () => {
  if (state.rangeTime.length) {
    state.formInline.startDate = state.rangeTime[0];
    state.formInline.endDate = state.rangeTime[1];
  }
  getNumberListQuery();
}

const resetForm = () => {
  console.log(checkFormRef.value)
  checkFormRef.value.resetFields()
}
// 取消
const cancelDia = () => {
  resetForm()
  checkDia.value = false
}

// 保存
const addForm = () => {
  console.log(checkForm.value)
}
function pageUpdate(val) {}
function sizeUpdate(val) {}

function submitForm() {
  checkFormRef.value.validate(valid => {
    console.log(valid)
  })
}

onMounted(() => {
  getNumberListQuery();
})

const getNumberListQuery = () => {
  getNumberList(state.formInline).then((res => {
    const result = res?.rows || [];
    result.forEach(item => {

    })
    state.recordList = result;
    state.total = res?.total;
  }))
}
</script>

<style lang="scss" scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
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
::v-deep .el-form--inline .el-form-item {
  margin-right: 20px;
}
.demo-form-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.but {
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 5px;
  border: none;
  width: 90px;
  height: 32px;
  color: #fff;
}
.normal {
  width: 46px;
  height: 22px;
  background: rgba(6, 176, 80, 0.2);
  border-radius: 3px;
  border: 1px solid #06b050;
  text-align: center;
  line-height: 22px;

  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #06b050;
}
.frozen {
  width: 46px;
  height: 22px;
  background: rgba(215, 49, 49, 0.2);
  border-radius: 3px;
  border: 1px solid #d73131;
  text-align: center;
  line-height: 22px;

  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #d73131;
}
.form-items {
  width: 200px !important;
}
.form-items-body {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
