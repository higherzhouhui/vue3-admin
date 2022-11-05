<template>
  <div class="user-list-wrap">
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="用户账号">
        <el-input v-model="state.formInline.account" placeholder=" 请输入用户账号" style="width: 200px" />
      </el-form-item>
      <el-form-item label="用户层级">
        <el-input v-model="state.formInline.level" placeholder=" 请输入用户层级" style="width: 200px" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="state.formInline.name" placeholder=" 请输入真实姓名" style="width: 200px" />
      </el-form-item>
      <el-form-item label="钱包地址">
        <el-input v-model="state.formInline.user" placeholder=" 请输入钱包地址" style="width: 200px" />
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
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="">
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
          资金调整
        </el-button>
      </template>
    </Table>

    <el-dialog v-model="checkDia" title="审核信息" center width="600px">
      <el-form :model="checkForm" ref="checkFormRef">
        <el-form-item>
          <el-radio-group v-model="checkForm.isChecked" prop="isChecked">
            <el-radio label="审核通过" />
            <el-radio label="审核失败" />
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="reason">
          <el-input v-model="checkForm.reason" :rows="2" type="textarea" placeholder="请输入原因" />
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
    // { prop: 'index', label: '序号' },
    { type: 'selection' },
    { prop: 'account', label: '用户账号' },
    { prop: 'level', label: '用户层级' },
    { prop: 'name', label: '姓名' },
    { prop: 'type', label: '钱包地址', width: 180, showOverflowTooltip: true },
    { prop: 'mobile', label: '币种名称', width: 340, showOverflowTooltip: true },
    { prop: 'email', label: '总量', width: 180, showOverflowTooltip: true },
    { prop: 'nick', label: '可用币个数', width: 180, showOverflowTooltip: true },
    { prop: 'type', label: '冻结币个数', width: 180, showOverflowTooltip: true },
    // { label: '操作', slot: 'action' },
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
