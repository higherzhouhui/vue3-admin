<template>
  <div class="user-list-wrap">
    <div class="titles">我的佣金统计</div>
    <Table
      :data="state.recordList"
      :columns="state.columns"
      :total="state.total"
      :pageSize="state.pageSize"
      :current="state.current"
      :pageUpdate="pageUpdate"
      :sizeUpdate="sizeUpdate"
    >
      <template #font="{ row }">
        <div :class="row.checkStatus >= 0 ? 'fonn1' : 'font2'">
          {{ row.checkStatus }}
        </div>
      </template>
      <template #action="{ row }">
        <el-button type="success" size="small" plain icon="Document" @click="showDia(row)"> 申请提款 </el-button>
      </template>
    </Table>

    <el-dialog v-model="checkDia" :before-close="cancelDia" title="提交确认" width="35%">
      <div v-if="state.cs">
        <div class="checkDia_fonts">
          <div>返佣按当前比例进行结算，确定要申请提款吗？</div>
          <div>代理业绩：125434.69</div>
          <div>返佣比例：2.1%</div>
          <div>预估佣金：2587.26 （具体请以实际金额为准）</div>
        </div>
        <el-form :model="checkForm" ref="checkFormRef">
          <el-form-item prop="account" label="选择提现至">
            <el-select
              v-model="checkForm.account"
              class="m-2"
              placeholder="请选择您要提现的银行卡"
              clearable
              size="large"
            >
              <el-option label="中国农业银行" value="11" />
            </el-select>
          </el-form-item>
          <el-form-item prop="account2" label="选择提现至">
            <el-select
              v-model="checkForm.account2"
              class="m-2"
              placeholder="请选择您要提现的虚拟币地址"
              clearable
              size="large"
            >
              <el-option label="JMSODNFLDGA" value="11" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <div class="checkForm_t">您还未绑定银行卡账户，请先绑定银行卡后再操作？</div>
      </div>

      <template #footer>
        <div class="but" v-if="state.cs">
          <el-button class="buts1" @click="cancelDia">取消</el-button>
          <el-button type="primary" size="medium" @click="submitForm" class="buts2">确定</el-button>
        </div>

        <div class="but" v-else>
          <el-button class="buts1" @click="checkDia = false">取消</el-button>
          <el-button type="primary" size="medium" @click="submitForm2" class="buts2">去绑定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import Table from '@/components/ProTable/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
      checkStatus: 10000,
      status1: '2022.10.19 13:48:34',
      status2: '2022.10.19 13:48:34',
      status3: '206.116.157.167',
      status4: '123',
    },
  ],
  columns: [
    { prop: 'account', label: '账号', width: 140 },
    { prop: 'level', label: '注册人数', width: 140 },
    { prop: 'name', label: '有效会员数', width: 140 },
    { prop: 'mobile', label: '充值总额', width: 140 },
    { prop: 'email', label: '充值人数', width: 180 },
    { prop: 'nick', label: '提现总额', width: 140 },
    { prop: 'type', label: '提款人数', width: 140 },
    { prop: 'authLevel', label: '优惠总额', width: 140 },
    { prop: 'checkStatus', label: '总输赢', width: 140, slot: 'font' },
    { prop: 'status1', label: '返佣比例', width: 140 },
    { prop: 'status2', label: '总佣金', width: 140 },
    { prop: 'status3', label: '未结算佣金', width: 140 },
    { prop: 'status4', label: '状态', width: 140 },
    { label: '操作', fixed: 'right', slot: 'action', width: 140 },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    account: '',
    level: '',
    mobile: null,
    email: null,
    checkStatus: '',
  },
  checkDia: false,
  checkFormRef: null,
  checkForm: {
    account: '',
    account2: '',
  },

  cs: false,
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)
// 申请提款
const showDia = data => {
  console.log('申请提款', data)
  state.checkDia = true
}

const resetForm = () => {
  console.log(checkFormRef.value)
  checkFormRef.value !== null && checkFormRef.value.resetFields()
}
// 取消
const cancelDia = () => {
  console.log(checkFormRef.value)
  resetForm()
  checkDia.value = false
}
// 确定
const submitForm = () => {
  console.log('111')
}
// 去绑定
const submitForm2 = () => {
  router.push({ name: 'personalCenter', query: { id: '4' } })
}
</script>

<style lang="scss" scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.fonn1 {
  color: rgb(42, 228, 86);
}
.fonn2 {
  color: red;
}
.checkDia_fonts {
  line-height: 25px;
  margin-bottom: 10px;
}
.but {
  display: flex;
  justify-content: flex-end;
}
.buts1 {
  width: 103px;
  height: 42px;
  background: #f5f7fe;
  border-radius: 29px;
  border: none;
}
.buts2 {
  width: 103px;
  height: 42px;
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 29px;
  border: none;
}
.checkForm_t {
  margin: 10px 0;
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
