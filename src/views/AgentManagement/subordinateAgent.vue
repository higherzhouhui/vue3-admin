<template>
  <div class="user-list-wrap">
    <div class="titles">下级代理</div>
    <el-scrollbar>
      <el-form :model="state.formInline" class="demo-form-inline">
        <el-form-item>
          <el-button @click="checkDia = true" class="but" icon="Plus">新增</el-button>
        </el-form-item>
        <el-form-item label="代理账户:" class="form-items-body">
          <el-input clearable v-model="state.formInline.agentAccount" placeholder="请输入代理账户" class="form-items" />
        </el-form-item>
        <el-form-item label="状态:" class="form-items-body">
          <el-select clearable v-model="state.formInline.agentStatus" class="m-2 form-items" placeholder="请选择状态">
            <el-option value="" label="全部"></el-option>
            <el-option value="0" label="冻结"></el-option>
            <el-option value="1" label="正常"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间:" class="form-items-body">
          <el-date-picker
            v-model="state.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="query" class="but" icon="Search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div style="padding: 12px; background: #fafafa; border-radius: 10px" v-loading="state.loading">
      <Table
        :data="state.recordList"
        :columns="state.columns"
        :total="state.total"
        :pageSize="state.pageSize"
        :current="state.current"
        :pageUpdate="pageUpdate"
        :sizeUpdate="sizeUpdate"
      >
        <template #names="{ row }">
          <div v-if="row.name === '2'" class="normal">正常</div>
          <div v-if="row.name === '3'" class="frozen">冻结</div>
        </template>
      </Table>
    </div>
    <el-dialog v-model="checkDia" :before-close="cancelDia" title="新增代理" width="600px">
      <el-form :model="checkForm" ref="ruleFormRef" label-width="100px" :rules="rules">
        <el-form-item label="上级代理:">
          <el-input :value="state.currentAgaentName" placeholder="" class="inputs" disabled/>
        </el-form-item>
        <el-form-item prop="agentType" label="代理类型:">
          <el-select
            v-model="checkForm.agentType"
            class="m-2"
            style="width: 100%"
            size="large"
            placeholder="请选择代理类型"
            clearable
          >
            <el-option :label="item.label" :value="item.value" v-for="(item) in agaentTypeDic" :key="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="commissionRatio" label="返佣比例:" v-if="checkForm.agentType === 3">
          <el-input v-model="checkForm.commissionRatio" placeholder="返佣比例不超过36%" clearable class="inputs" type="number" :suffix-icon="36">
            <template #append>%</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="agentName" label="代理昵称:">
          <el-input v-model="checkForm.agentName" placeholder="请输入代理昵称" clearable class="inputs" />
        </el-form-item>
        <el-form-item prop="agentAccount" label="代理账号:">
          <el-input v-model="checkForm.agentAccount" placeholder="请输入代理账号" clearable class="inputs" />
        </el-form-item>
        <el-form-item prop="loginPwd" label="密码:">
          <el-input v-model="checkForm.loginPwd" placeholder="请输入密码" clearable class="inputs" type="password" show-password/>
        </el-form-item>
        <el-form-item prop="reloginPwd" label="确认密码:">
          <el-input v-model="checkForm.reloginPwd" placeholder="请再次输入密码" clearable class="inputs" type="password" show-password/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="buts">
          <el-button @click="resetForm(ruleFormRef)" class="buts1">取消</el-button>
          <el-button type="primary" size="medium"  @click="submitForm(ruleFormRef)" class="buts2" :loading="state.loading">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, ref } from 'vue'
import { getAgaentList, addChildAgent } from '@/api/agaentaccount';
import Table from '@/components/ProTable/index.vue'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus';

const agaentTypeDic = [
  {label: '无条件扶持代理', value: 3},
  {label: '普通代理', value: 1},
  {label: '团队代理', value: 4},
  {label: '扶持代理', value: 2},
]
const userStore = useUserStore();
const ruleFormRef = ref();
const state = reactive({
  recordList: [],
  columns: [
    { prop: 'agentAccount', label: '代理账号' },
    { prop: 'custagentType', label: '代理类型' },
    { prop: 'custagentStatus', label: '状态', slot: 'names' },
    { prop: 'directAgentNum', label: '直属代理总数' },
    { prop: 'thisMonthDirectAgentNum', label: '本月新增直属代理数' },
    { prop: 'directUserNum', label: '直属会员人数' },
    { prop: 'thisMonthDirectUserNum', label: '本月新增直属会员数' },
    { prop: 'registerTime', label: '创建时间', width: 180 },
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  timeRange: [],
  formInline: {
    agentAccount: '',
    agentStatus: '',
    endDate: '',
    startDate:'',
  },
  checkDia: false,
  checkFormRef: null,
  checkForm: {
    agentAccount: '',
    agentName: '',
    agentPid: '',
    commissionRatio: '',
    loginPwd: '',
    agentType: 3,
    reloginPwd: '',
  },
  checkDiaType: '',
  currentAgaentName: '',
  loading: true,
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (state.checkForm.loginPwd !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('loginPwd', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== state.checkForm.loginPwd) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const validatecommissionRatio = (rule, value, callback) => {
  if (value > 36 ) {
    callback(new Error('佣金比例不能超过36%'))
  } else if (value < 0) {
    callback(new Error('佣金比例不能小于0'))
  } else {
    callback()
  }
}

const rules = reactive({
  agentPid: [
    { required: true, message: '请输入上级代理', trigger: 'blur' },
  ],
  agentType: [{ required: true, message: '请输入上级代理', trigger: 'blur' }],
  commissionRatio: [
    { required: true, message: '请输入返佣比例', trigger: 'blur' },
    { validator: validatecommissionRatio, trigger: 'blur' },
  ],
  agentAccount: [
    { required: true, message: '请输入代理账号', trigger: 'blur' },
  ],
  agentName: [{required: true, message: '请输入代理账号', trigger: 'blur'}],
  loginPwd: [{ validator: validatePass, trigger: 'blur' }],
  reloginPwd: [{ validator: validatePass2, trigger: 'blur' }],
})


onMounted(async() => {
  await userStore.GET_USER_INFO();
  // state.formInline.parentAgent =  userStore.uid;
  state.checkForm.agentPid = userStore.uid;
  state.currentAgaentName = userStore.name;
  query();
})

// 查询
const query = () => {
  state.loading = true;
  if (state.timeRange.length) {
    state.formInline.startDate = state.timeRange[0];
    state.formInline.endDate = state.timeRange[1];
  }
  getAgaentList(state.formInline).then(res => {
    state.loading = false;
    const result = res?.rows || [];
    result.forEach(item => {
      item.custagentType = agaentTypeDic[item.agentType].label;
      item.custagentStatus = item.agentStatus === 1 ? '正常' : '冻结';
    })
    state.recordList = result;
    state.total = res?.total;
  })
}

const resetForm = (formEl) => {
  checkDia.value = false
  if (!formEl) return
  formEl.resetFields()
}
// 取消
const cancelDia = () => {
  checkDia.value = false;
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addForm();
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 保存
const addForm = () => {
  state.loading = true;
  addChildAgent({...state.checkForm, agentPid: state.checkForm.agentPid }).then(res => {
    state.loading = false;
    if (res?.code === 200) {
      ElMessage.success('添加成功!')
      checkDia.value = false;
      query();
    } else {
      ElMessage.error(res?.msg || '网络错误，请重试！');
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
.buts {
  display: flex;
  justify-content: end;
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
}
.inputs {
  height: 42px;
}
</style>
