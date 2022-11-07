<template>
  <div>
    <div class="titles">个人中心</div>
    <div class="titles_div">
      <div
        v-for="item in coreLeft"
        :key="item.id"
        :class="`${item.Check ? 'titles_div12' : 'titles_div123'}`"
        @click="coreLeftF(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="core_right">
      <div v-if="coreLeftIndex === '1'">
        <!-- <ExtensionDomainName /> -->
        <div class="titles_font">基本信息</div>
        <div style="padding-left: 110px" v-loading="!userStore?.account">
          <!-- 头像 -->
          <el-avatar :size="80" :src="circleUrl" style="margin-left: 100px" :icon="UserFilled" />
          <div class="displ" style="margin-top: 30px">
            <div class="displ_left">代理账户名</div>
            <div>{{ userStore?.account }}</div>
          </div>
          <div class="displ">
            <div class="displ_left">姓名</div>
            <div>{{ userStore?.name }}</div>
          </div>
          <!-- <div class="displ">
            <div class="displ_left">账户余额</div>
            <div>{{ '12543.15' }}</div>
          </div> -->
          <div class="displ">
            <div class="displ_left">注册时间</div>
            <div>{{ userStore.createTime }}</div>
          </div>
          <div class="displ">
            <div class="displ_left">代理类型</div>
            <div>{{ userStore?.rolesType}}</div>
          </div>
          <div class="displ">
            <div class="displ_left">扶持有效时间</div>
            <div>{{ userStore.validTime}}</div>
          </div>
          <div class="displ">
            <div class="displ_left">手机号码</div>
            <div>{{ userStore.phone || '未绑定' }}</div>
          </div>
          <div class="displ">
            <div class="displ_left">QQ号</div>
            <div>
              <el-input v-model="state.qqData" placeholder="请输入QQ号"></el-input>
            </div>
          </div>
          <div class="displ">
            <div class="displ_left"></div>
            <el-button :loading="state.infoLoading" class="but1s" @click="but">保存</el-button>
          </div>
        </div>
      </div>
      <div v-if="coreLeftIndex === '2'" style="display: flex; align-items: center; justify-content: center">
        <div class="coreLeft2">
          <div class="coreLeft2_font">为了确保您的账号安全，请您填写相关安全信息，以备不时之需</div>
          <div class="coreLeft2_div" style="margin-bottom: 20px">
            <div class="coreLeft2_div2">
              <img src="../../assets/imgs/sy/slog.png" alt="" />
              <div>
                <div class="coreLeft2_div2_font1">登录密码</div>
                <div>修改登录时的密码，定期修改有利于账户安全</div>
              </div>
            </div>
            <el-button class="coreLeft2_but" @click="modify(1)">修改</el-button>
          </div>
          <div class="coreLeft2_div">
            <div class="coreLeft2_div2">
              <img src="../../assets/imgs/sy/sjlog.png" alt="" />
              <div>
                <div class="coreLeft2_div2_font1">手机号码</div>
                <div>修改绑定手机号码，用于接收短信验证码</div>
              </div>
            </div>
            <el-button class="coreLeft2_but" @click="modify(2)">验证</el-button>
          </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog
          :before-close="cancelDia"
          v-model="checkDia"
          :title="state.radioGroupData === '1' ? '修改登录密码' : '绑定手机号'"
          width="30%"
        >
          <div class="elForm" v-if="radioGroupData === '1'">
            <el-form :model="checkForm" ref="checkFormRef11" label-width="85px">
              <el-form-item prop="account" label="原密码:">
                <el-input v-model="checkForm.account" placeholder="请输入原密码" class="inputs1" clearable type="password" show-password/>
              </el-form-item>
              <el-form-item prop="account2" label="新密码:">
                <el-input v-model="checkForm.account2" placeholder="请输入新密码" class="inputs1" clearable type="password" show-password/>
              </el-form-item>
              <el-form-item prop="account3" label="确认密码:">
                <el-input v-model="checkForm.account3" placeholder="请再次输入密码" class="inputs1" clearable type="password" show-password/>
                <div style="color: red" v-if="checkForm.account3.length > 0 && checkForm.account2 !== checkForm.account3">两次密码不一致</div>
              </el-form-item>
            </el-form>
          </div>
          <!-- 手机 -->
          <div class="elForm" v-if="radioGroupData === '2'">
            <el-form :model="checkForm2" ref="checkFormRef22" label-width="85px">
              <el-form-item prop="account" label="手机号:">
                <el-input v-model="checkForm2.phone" placeholder="请输入手机号" class="inputs1" clearable />
                <div style="color: red" v-if="checkForm2.phone.length > 0 && checkForm2.phone.length !== 11">请输入正确的手机号格式</div>
              </el-form-item>
              <el-form-item prop="code" label="验证码:" style="position: relative">
                <el-input v-model="checkForm2.verifyCode" placeholder="请输入验证码" class="inputs1" clearable @keyup.enter="addForm"/>
                <div style="color: red" v-if="checkForm2.verifyCode.length > 0 && checkForm2.verifyCode.length < 3">验证码错误</div>
                <div
                  v-if="!state.verificationD"
                  style="font-size: 14px; color: #5f2ae0; position: absolute; top: 5px; right: 10px; cursor: pointer"
                  @click="verification"
                >
                  获取验证码
                </div>
                <div v-else style="font-size: 14px; position: absolute; top: 5px; right: 30px">
                  {{ state.numbers }}秒后重新发送
                </div>
              </el-form-item>
            </el-form>
          </div>
          <template #footer>
            <div class="but">
              <el-button @click="cancelDia" class="buts1">取消</el-button>
              <el-button type="primary" size="medium" @click="addForm" class="buts2">确定</el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      <div v-if="coreLeftIndex === '3'">
        <DrawingAccount :popUpType="route.query.popUpType" />
      </div>
    </div>
    <!-- <img src="../../assets/imgs/sy/sjlog.png" alt="" /> -->
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, onUpdated, watch } from 'vue'
import ExtensionDomainName from './components/extensionDomainName.vue'
import DrawingAccount from './components/drawingAccount.vue'
import { UserFilled } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router' 
import { useUserStore } from '@/store'
import { changePwd, sendPhoneSms, bindPhoneConfirm, updateOverviewInfo } from '@/api/user';
import { ElMessage } from 'element-plus';
const route = useRoute();
const router = useRouter()
const userStore = useUserStore();
const state = reactive({
  coreLeft: [
    { id: '1', name: '账号概览', Check: true },
    { id: '2', name: '账号安全', Check: false },
    { id: '3', name: '卡号绑定', Check: false },
  ],
  checkFormRef: null,

  checkFormRef2: null,

  checkFormRef11: null,
  checkFormRef22: null,
  coreLeftIndex: '1',
  qqData: '',
  infoLoading: false,
  checkForm: {
    account: '',
    account2: '',
    account3: '',
  },
  checkForm2: {
    phone: '',
    countryCode: '+86',
    verifyCode: '',
  },
  radioGroupData: '',
  checkDia: false,

  verificationD: false,
  numbers: 60,
})

const {
  coreLeft,
  checkDia,
  checkForm,
  checkForm2,
  checkFormRef,
  checkFormRef2,
  checkFormRef11,
  checkFormRef22,
  radioGroupData,
  coreLeftIndex,
} = toRefs(state)

// 初始化
onMounted(async() => {
  await userStore.GET_USER_INFO();
  state.qqData = userStore.qq;
})

watch(() => route.query.id, async(newVal, oldVal) => {
  if (newVal !== undefined) {
    await userStore.GET_USER_INFO();
    state.qqData = userStore.qq;
    state.coreLeftIndex = newVal;
    state.coreLeft.forEach(item => {
      if (item.id === newVal) {
        item.Check = true
      } else {
        item.Check = false
      }
    })
  }
})

// 切换
const coreLeftF = item => {
  router.push({ name: 'personalCenter', query: { id: item.id } })
}
// 修改密码 手机
const modify = data => {
  state.checkDia = true
  if (data === 1) {
    state.radioGroupData = '1'
  } else {
    state.radioGroupData = '2'
  }
}

// 验证
const verification = () => {
  if (state.checkForm2.phone.length !== 11) {
    return;
  }
  sendPhoneSms({
    countryCode: state.checkForm2.countryCode,
    phone: state.checkForm2.phone,
  }).then((res) => {
    if (res?.code === 200) {
      ElMessage.success('发送成功！');
      state.verificationD = true
      var time;
      time = setInterval(() => {
          state.numbers = state.numbers - 1
          if (state.numbers === 0) {
            clearInterval(time)
            state.verificationD = false
            state.numbers = 60
          }
        }, 1000)
      } else {
        ElMessage.success('发送失败,请重试！');
      }
    })
}

// 取消
const cancelDia = () => {
  if (state.radioGroupData === '1') {
    // checkFormRef11.value.resetFields()
    state.checkForm = {
      account: '',
      account2: '',
      account3: '',
    }
  }
  if (state.radioGroupData === '2') {
    // checkFormRef22.value.resetFields()
    state.checkForm2.verifyCode = '';
    state.checkForm2.phone = '';
  }
  checkDia.value = false
}
// 确定
const addForm = () => {
  if (state.radioGroupData === '1') {
    if (state.checkForm.account2 !== state.checkForm.account3 || !state.checkForm.account.length || !state.checkForm.account2.length) {
      return;
    }
    state.infoLoading = true;
    changePwd(state.checkForm).then((res) => {
      state.infoLoading = false;
      if (res?.code === 200) {
        ElMessage.success('修改成功！');
        checkDia.value = false
        state.checkForm.account = '';
        state.checkForm.account1 = '';
      } else {
        ElMessage.error(res?.msg || '原密码错误');
      }
    })
  }
  if (state.radioGroupData === '2') {
    // 修改手机号
    if (state.checkForm2.phone.length !== 11 || state.checkForm2.verifyCode.length < 3) {
      return;
    }
    state.infoLoading = true;
    bindPhoneConfirm(state.checkForm2).then(res => {
      state.infoLoading = false;
      if (res?.code === 200) {
        ElMessage.success('修改成功');
        state.checkForm2.verifyCode = '';
        checkDia.value = false
      } else {
        ElMessage.error(res?.msg || '修改失败！');
      }
    })
  }
}

// 修改
const but = () => {
  state.infoLoading  = true;
  updateOverviewInfo({qq: state.qqData}).then(res => {
    state.infoLoading  = false;
    if (res?.code === 200) {
      ElMessage.success('修改成功！');
    } else {
      ElMessage.success(res?.msg || '网络错误，请重试！');
    }
  })
}
</script>

<style lang="scss" scoped>
.core_left_div {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  &:hover {
    color: #0000ff;
  }
}
.core_left_div1 {
  background: #f2f2f2;
  color: #666666;
}
.core_left_div12 {
  background: #e9f2fc;
  color: #0000ff;
}
.el-main {
  margin-left: 10px;
}
.checkForm1 {
  width: 500px;
  padding-top: 20px;
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
.titles_div {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 15px;
  cursor: pointer;

  div {
    padding: 9px 17px;
    background: #f5f7fe;
    border-radius: 5px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
    margin-right: 10px;

    &:hover {
      background: #d1d1f5;
    }
  }
}
.titles_div12 {
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%) !important;
  color: #fff !important;
}

.inputs {
  width: 500px;
  height: 50px;
  border-radius: 10px;
}
.buts {
  width: 150px;
  height: 58px;
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 29px;
  border: none;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;

  margin-top: 30px;
}
.titles_font {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  margin-bottom: 40px;
}
.displ {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #333333;
  .displ_left {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #999999;
    margin-right: 60px;
    width: 110px;
    text-align: end;
  }
}
.but1s {
  width: 131px;
  height: 36px;
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 5px;
  border: none;

  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
}
.coreLeft2 {
  width: 824px;
  .coreLeft2_font {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #5f2ae0;
    margin-bottom: 48px;
  }
  .coreLeft2_div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 85px 0 61px;

    height: 187px;
    background: #fafafa;
    border-radius: 10px;
  }
  .coreLeft2_div2 {
    display: flex;
    align-items: center;

    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #666666;
    img {
      width: 32px;
      height: 32px;
      margin-right: 40px;
    }
    .coreLeft2_div2_font1 {
      font-size: 24px;
      font-weight: 600;
      color: #333333;
    }
  }
}
.coreLeft2_but {
  width: 80px;
  height: 36px;
  background: #ebe5f7;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #5f2ae0;
  border: none;
  &:hover {
    background: #c1bfc6;
    color: #794cea;
  }
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
.inputs1 {
  height: 42px;
}
</style>
