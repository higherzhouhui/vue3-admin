<template>
  <div class="user-list-wrap">
    <div style="margin-bottom: 10px" class="top_displ">
      <div class="radio-group">
        <div
          :class="radioGroupData === '1' ? 'radio-group1' : 'radio-group12'"
          style="margin-right: 10px"
          @click="radioGroupData = '1'"
        >
          银行卡
        </div>
        <div :class="radioGroupData === '2' ? 'radio-group1' : 'radio-group12'" @click="radioGroupData = '2'">
          虚拟币
        </div>
      </div>
      <el-button @click="popAddDialog" class="buts">新增</el-button>
    </div>
    <Table
      v-if="radioGroupData === '1'"
      :data="state.recordList"
      :columns="state.columns"
      :total="state.total"
      :pageSize="state.pageSize"
      :current="state.current"
      :pageUpdate="pageUpdate"
      :sizeUpdate="sizeUpdate"
      v-loading="state.loading"
      maxHeight="calc(100vh - 430px)"
    >
      <template #action="{ row }">
        <el-button type="success" size="small" plain icon="Document" @click="showDia(row)"> 编辑 </el-button>
        <el-button type="danger" size="small" plain icon="Document" @click="deleteAddress(row)"> {{row.bindStatus === 0 ? ThisStatus[1] : ThisStatus[0]}} </el-button>
      </template>
    </Table>

    <Table
      v-if="radioGroupData === '2'"
      :data="state.recordList2"
      :columns="state.columns2"
      :total="state.total2"
      :pageSize="state.pageSize2"
      :current="state.current2"
      :pageUpdate="pageUpdate2"
      :sizeUpdate="sizeUpdate2"
    >
      <template #action="{ row }">
        <el-button type="success" size="small" plain icon="Document" @click="showDia(row)"> 编辑 </el-button>
        <el-button type="danger" size="small" plain icon="Document" @click="deleteAddress(row)"> {{row.bindStatus === 0 ? ThisStatus[1] : ThisStatus[0]}} </el-button>
      </template>
    </Table>
    <!-- 弹窗 -->
    <el-dialog
      :before-close="cancelDia"
      v-model="checkDia"
      :title="state.checkDiaType === '1' ? '新增' : '编辑'"
      width="500px"
    >
      <div class="elForm" v-if="radioGroupData === '1'">
        <el-form :model="checkForm" ref="checkFormRef" label-width="85px">
          <el-form-item prop="realName" label="真实姓名：">
            <el-input v-model="checkForm.realName" placeholder="请输入真实姓名" class="inputs1" clearable />
            <div class="el-form-error" v-if="!state.checkForm.realName && state.trySubStatus">姓名不能为空</div>
          </el-form-item>
          <el-form-item prop="bankName" label="开户行：">
            <el-input v-model="checkForm.bankName" placeholder="请输入银行名字" class="inputs1" clearable />
            <div class="el-form-error" v-if="!state.checkForm.bankName && state.trySubStatus">开户行必须填写</div>
          </el-form-item>
          <el-form-item prop="bankNo" label="银行卡号：">
            <el-input v-model="checkForm.bankNo" placeholder="请输入银行卡号" class="inputs1" clearable />
            <div class="el-form-error" v-if="!state.checkForm.bankNo && state.trySubStatus">银行卡号必须填写</div>
          </el-form-item>
          <el-form-item prop="bankAddress" label="支行地址：">
            <el-input v-model="checkForm.bankAddress" placeholder="请输入支行地址" class="inputs1" clearable />
            <div class="el-form-error" v-if="!state.checkForm.bankAddress && state.trySubStatus">开户支行必须填写</div>
          </el-form-item>
          <el-form-item prop="bindStatus" label="状态：">
            <el-radio-group v-model="checkForm.bindStatus" class="ml-4 inputs1">
              <el-radio :label="1" size="small">启用</el-radio>
              <el-radio :label="0" size="small">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <!-- 虚拟币 -->
      <div class="elForm" v-if="radioGroupData === '2'">
        <el-form :model="checkForm2" ref="checkFormRef2" label-width="85px">
          <el-form-item prop="walletName" label="名称">
            <el-input v-model="checkForm2.walletName" placeholder="请输入名称" class="inputs1" clearable />
            <div class="el-form-error" v-if="!state.checkForm2.walletName && state.trySubStatus">名称必须填写</div>
          </el-form-item>
          <el-form-item prop="walletProtocol" label="网链协议：">
            <el-select
              v-model="checkForm2.walletProtocol"
              placeholder="请选择网链协议"
              style="width: 100%"
              size="large"
              clearable
            >
              <el-option label="USDT-TRC20" value="USDT-TRC20" />
              <el-option label="USDT-ERC20" value="USDT-ERC20" />
              <el-option label="BTC-TRC20" value="BTC-TRC20" />
              <el-option label="BTC-ERC20" value="BTC-ERC20" />
            </el-select>
            <div class="el-form-error" v-if="!state.checkForm2.walletProtocol && state.trySubStatus">必须选择网络协议</div>
          </el-form-item>
          <el-form-item prop="walletAddress" label="收款地址：">
            <el-input v-model="checkForm2.walletAddress" placeholder="请输入收款地址" class="inputs1" clearable />
            <div class="el-form-error" v-if="!state.checkForm2.walletAddress && state.trySubStatus">收款地址必须填写</div>
          </el-form-item>
          <el-form-item prop="bindStatus" label="状态：">
            <el-radio-group v-model="checkForm2.bindStatus" class="ml-4">
              <el-radio :label="1" size="small">启用</el-radio>
              <el-radio :label="0" size="small">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="but">
          <el-button @click="cancelDia" class="buts1">取消</el-button>
          <el-button type="primary" size="medium" @click="addForm" class="buts2" :loading="state.loading">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, ref, watch, defineProps } from 'vue';
import { getWalletList, getBankList, addmyBank, addmyWallet, bankmyUpdate, walletmyUpdate } from '@/api/user';
import Table from '@/components/ProTable/index.vue';
import { ElMessage } from 'element-plus';

const props = defineProps( {
  popUpType: {
    type: String,
    default: '',
  }
})
const state = reactive({
  recordList: [],
  columns: [
    { prop: 'realName', label: '真实姓名' },
    { prop: 'bankNo', label: ' 银行卡号' },
    { prop: 'bankAddress', label: '银行地址' },
    { prop: 'custbindStatus', label: '状态' },
    { prop: 'createTime', label: '添加时间' },
    { label: '操作', field: 'right', slot: 'action', width: 200 },
  ],
  recordList2: [],
  columns2: [
    { prop: 'walletName', label: '名称' },
    { prop: 'walletAddress', label: ' 收款地址' },
    { prop: 'walletProtocol', label: '网链协议' },
    { prop: 'custbindStatus', label: '状态' },
    { prop: 'createTime', label: '添加时间' },
    { label: '操作', field: 'right', slot: 'action', width: 200 },
  ],

  total: 30,
  pageSize: 15,
  current: 1,

  total2: 30,
  pageSize2: 15,
  current2: 1,

  checkDia: false,
  checkFormRef: null,
  checkForm: {},
  checkFormRef2: null,
  checkForm2: {
  },

  checkDiaType: '',

  firstFlag: true,
  canvasImageUrl: '',

  radioGroupData: '1',
  loading: false,
  trySubStatus: false,
})
const { checkDia, checkForm, checkFormRef, checkForm2, checkFormRef2, radioGroupData } = toRefs(state)

const tabPosition = ref('1')

const popAddDialog = (type) => {
  state.checkDia = true;
  state.checkForm = {
    realName: '',
    bankName: '',
    bankNo: '',
    bankAddress:'',
    bindStatus: 1,
  };
  state.checkForm2 = {
    walletName: '',
    walletAddress: '',
    walletProtocol: '',
    bindStatus: 1,
  };
  if (type === 'bank') {
    state.radioGroupData = '1';
  }
  if (type === 'usdt') {
    state.radioGroupData = '2';
  }
  state.checkDiaType = '1';
}
// 初始化
onMounted(() => {
  if (props.popUpType) {
    popAddDialog(props.popUpType);
  } else {
    getBankListReuquest();
  }
})
const ThisStatus = ['禁用', '启用'];
const getBankListReuquest = async() => {
  state.loading = true;
  const res = await getBankList({
    pageNum: state.current,
    pageSize: state.pageSize,
  });
  const result = res?.rows || [];
  result.forEach(item => {
    item.custbindStatus = ThisStatus[item.bindStatus ? 1 : 0];
  });
  state.recordList = result;
  state.total = res?.total || 0;
  state.loading = false;
}

const getWalletListReuquest = async() => {
  state.loading = true;
  const res = await getWalletList({
    pageNum: state.current2,
    pageSize: state.pageSize2,
  });
  const result = res?.rows || [];
  result.forEach(item => {
    item.custbindStatus = ThisStatus[item.bindStatus ? 1 : 0];
  });
  state.recordList2 = result;
  state.total2 = res?.total || 0;
  state.loading = false;
}

watch(() => state.radioGroupData, (newVal, oldVal) => {
  if (newVal === '1') {
    getBankListReuquest();
  } else {
    getWalletListReuquest();
  }
})

watch(() => props.popUpType, (newVal) => {
  if (newVal) {
    popAddDialog(newVal);
  }
})

// 编辑
const showDia = data => {
  console.log(data);
  state.checkForm = data;
  state.checkForm2 = data;
  // console.log('当前数据', data)
  state.checkDia = true;
  state.checkDiaType = '2'
}
// 禁用/启用
const deleteAddress = data => {
  if (state.radioGroupData === '1') {
    const cstatus = data.bindStatus === 0 ? 1 : 0;
    bankmyUpdate({
      ...data,
      bindStatus: cstatus
    }).then(res => {
        if (res?.code === 200) {
          ElMessage.success(ThisStatus[cstatus] + '成功!');
          getBankListReuquest();
        } else {
          ElMessage.error(res?.msg || '网络错误，请重试!');
        }
    })
  } else {
    const cstatus = data.bindStatus === 0 ? 1 : 0;
    walletmyUpdate({
      ...data,
      bindStatus: cstatus,
    }).then(res => {
        if (res?.code === 200) {
          ElMessage.success(`${data.bindStatus ? '禁用' : '启用'}成功`);
          getWalletListReuquest();
        } else {
          ElMessage.error(res?.msg || '网络错误，请重试!');
        }
    })
  }
}
// 取消
const cancelDia = () => {
  checkDia.value = false
  state.trySubStatus = false;
}
// 确定
const addForm = () => {
  if (state.radioGroupData === '1') {
    if (!state.checkForm.realName || !state.checkForm.bankNo || !state.checkForm.bankName || !state.checkForm.bankAddress) {
      state.trySubStatus = true;
      return;
    }
    state.loading = true;
    // 编辑
    if (state.checkDiaType === '2') {
      bankmyUpdate(state.checkForm).then(res => {
          state.loading = false;
          if (res?.code === 200) {
            checkDia.value = false;
            ElMessage.success('修改成功!');
            getBankListReuquest();
          } else {
            ElMessage.error(res?.msg || '网络错误，请重试!');
          }
        })
    } else {
      addmyBank(state.checkForm).then(res => {
        state.loading = false;
        if (res?.code === 200) {
          checkDia.value = false;
          ElMessage.success('添加成功!');
          getBankListReuquest();
        } else {
          ElMessage.error(res?.msg || '网络错误，请重试!');
        }
      })
    }
  }
  if (state.radioGroupData === '2') {
    if (!state.checkForm2.walletAddress || !state.checkForm2.walletName || !state.checkForm2.walletProtocol) {
      state.trySubStatus = true;
      return;
    }
    if (state.checkDiaType === '2') {
      walletmyUpdate(state.checkForm2).then(res => {
          state.loading = false;
          if (res?.code === 200) {
            checkDia.value = false;
            ElMessage.success('修改成功!');
            getWalletListReuquest();
          } else {
            ElMessage.error(res?.msg || '网络错误，请重试!');
          }
        })
    } else {
      addmyWallet(state.checkForm2).then((res) => {
        state.loading = false;
        if (res?.code === 200) {
            checkDia.value = false;
            ElMessage.success('添加成功!');
            getWalletListReuquest();
          } else {
            ElMessage.error(res?.msg || '网络错误，请重试!');
          }
        })
    }

  }
}

// 翻页
const pageUpdate = data => {
  state.current = data;
  getBankListReuquest();
}
const sizeUpdate = data => {
  state.pageSize = data;
  getBankListReuquest();
}
// 虚拟币翻页
const pageUpdate2 = data => {
  state.current2 = data;
  getWalletListReuquest();
}
const sizeUpdate2 = data => {
  state.pageSize2 = data;
  getWalletListReuquest();
}

</script>

<style lang="scss" scoped>
.user-list-wrap {
  padding: 10px;
}
.top_displ {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.but {
  display: flex;
  justify-content: flex-end;
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

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.buts {
  width: 90px;
  height: 32px;
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #ffffff;
}
.radio-group {
  display: flex;
  align-items: center;
}
.radio-group1 {
  width: 90px;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #622ae0;

  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #622ae0;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  &:hover {
    color: #4268a9;
  }
}
.radio-group12 {
  width: 90px;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #f2f2f2;

  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #333333;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  &:hover {
    color: #4268a9;
  }
}
.inputs1 {
  height: 42px;
}
</style>
