<template>
  <div class="navbar" :class="set.layoutMod + '-nav-section'">
    <!-- <div v-if="set.layoutMod === 'horizontal'" class="horizontal-sidebar-container">
      <Logo :class="set.layoutMod + '-logo'" :collapse="set.isCollapse" />
      <MenuBar />
    </div> -->

    <!-- <HamBurger
      v-if="set.layoutMod === 'vertical'"
      id="hamburger-container"
      :is-active="set.sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    /> -->
    <div class="displ">
      <div class="displ-left">FBS Live</div>
      <BreadCrumb v-if="set.layoutMod === 'vertical'" id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <div class="right-menu" :class="{ mobile: set.device === 'mobile' }">
      <!-- <div class="right-menu-qh">
        <img src="../../../assets/imgs/zh.png" alt="" />
        <span>ZH</span>
        <el-icon class="right-menu-qh2">
          <ArrowDown />
        </el-icon>
      </div> -->
      <!-- 国际化 -->
      <!-- <SizeSelect class="right-menu-qh"></SizeSelect> -->
      <!-- 组件国际化 -->
      <!-- <LangSelect class="right-menu-qh"></LangSelect> -->

      <el-dropdown class="p8 avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="set.avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
          <el-avatar :icon="UserFilled" :size="24" />

          <div class="username">
            <div class="username_font">
              <div class="username_font2">{{ set.userName }}</div>
              <div class="username_font3">{{ set.agentTypeName }}</div>
            </div>
            <el-icon class="arrow">
              <img src="../../../assets/imgs/xl.png" />
            </el-icon>
          </div>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <!-- <router-link to="/user/index">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link> -->
            <!-- <router-link to="/">
              <el-dropdown-item>首 页</el-dropdown-item>
            </router-link> -->
            <el-dropdown-item divided @click="personal">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="modify">申请取款</el-dropdown-item>
            <!-- <a
              target="_blank"
              href="https://github.com/mvpyb"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a
              target="_blank"
              href="https://gitee.com/simmon_page"
            >
              <el-dropdown-item>码 云</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- <div
        class="p8 el-icon-setting hover-effect"
        @click="openSettings"
      >
        <el-icon class="setting">
          <Setting />
        </el-icon>
      </div> -->
    </div>

    <!-- 申请取款 -->
    <el-dialog :before-close="cancelDia" v-model="set.checkDia" title="申请取款" width="30%">
      <div class="moneys">
        <div style="font-size: 14px; font-family: PingFangSC-Regular, PingFang SC">可取款金额</div>
        <div
          style="
            margin-top: 4px;
            text-align: center;
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
          "
        >
          {{ set.moneysData.toFixed(2) }}
        </div>
      </div>
      <el-form :model="checkForm" ref="checkFormRef11" label-width="90px">
        <el-form-item prop="account" label="取款账号:">
          <el-input disabled class="inputs1" :value="set.agentAccount" />
        </el-form-item>
        <el-form-item prop="amount" label="取款金额:">
          <el-input v-model="checkForm.amount" type="number" placeholder="请输入取款金额" class="inputs1" clearable />
        </el-form-item>
        <el-form-item prop="withdrawType" label="取款方式:">
          <el-select
            v-model="checkForm.withdrawType"
            placeholder="请选择取款方式"
            style="width: 100%"
            size="large"
            clearable
            @change="checkForm.typeRecordId = ''"
          >
            <el-option label="银行卡取款" value="1" />
            <el-option label="虚拟币USDT取款" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item prop="typeRecordId" label="取款银行:" v-if="checkForm.withdrawType === '1'">
          <el-select
            v-if="set.optionData1.length > 0"
            v-model="checkForm.typeRecordId"
            placeholder="请选择取款银行"
            style="width: 100%"
            size="large"
            clearable
          >
            <el-option :label="item.bankName" :value="item.id" v-for="item in set.optionData1" :key="item.id" />
          </el-select>
          <div v-else style="color: #178aff; cursor: pointer" @click="clicks1">请先绑定银行卡</div>
        </el-form-item>
        <el-form-item prop="typeRecordId" label="虚拟币渠道:" v-if="checkForm.withdrawType === '2'">
          <el-select
            v-if="set.optionData2.length > 0"
            v-model="checkForm.typeRecordId"
            placeholder="请选择虚拟币渠道"
            style="width: 100%"
            size="large"
            clearable
          >
            <el-option :label="item.walletName" :value="item.id" v-for="item in set.optionData2" :key="item.id" />
          </el-select>
          <div v-else style="color: #178aff; cursor: pointer" @click="clicks1">请先绑定虚拟币</div>
        </el-form-item>
        <el-form-item prop="phone" label="手机号:">
          <el-input v-model="checkForm.phone" placeholder="请输入手机号" class="inputs1" clearable maxlength="11" />
        </el-form-item>
        <el-form-item prop="verifyCode" label="验证码:" style="position: relative">
          <el-input
            v-model="checkForm.verifyCode"
            placeholder="请请输入验证码"
            class="inputs1"
            clearable
            maxlength="10"
          >
            <template #suffix>
              <div
                v-if="!set.verificationD"
                style="font-size: 14px; color: #5f2ae0; cursor: pointer"
                @click="verification"
              >
                获取验证码
              </div>
              <div v-else style="font-size: 14px">
                {{ set.numbers }}
              </div>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="but">
          <el-button @click="cancelDia" class="buts1">取消</el-button>
          <el-button type="primary" size="medium" @click="addForm" class="buts2">确认提款</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, computed, toRefs } from 'vue'
import { useAppStore, useUserStore, useSettingsStore } from '@/store'
import { useRouter } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import HamBurger from './components/HamBurger'
import BreadCrumb from './components/BreadCrumb'
// import HeaderSearch from './components/HeaderSearch'
// import ScreenFull from './components/Screenfull'
// import SizeSelect from './components/SizeSelect'
import LangSelect from './components/LangSelect'
// import { emitter } from '@/utils/mitt'

import Logo from '@/layout/components/sidebar/Logo'
import MenuBar from '../sidebar/Menu'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBalanceInfo, sendSms, confirm } from '@/api/drawing/drawing'
import { getBankList, getWalletList } from '@/api/user'
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const toggleSideBar = () => {
  appStore.TOGGLE_SIDEBAR()
}
const set = reactive({
  showLogo: computed(() => {
    return settingsStore.sidebarLogo
  }),
  layoutMod: computed(() => {
    return settingsStore.layoutMod
  }),
  sidebar: computed(() => {
    return appStore.sidebar
  }),
  avatar: computed(() => {
    return userStore?.userInfo?.user?.avatar
  }),
  userName: computed(() => {
    const agentName = userStore?.userInfo?.agentName
    //1-技术专用,为空为代理账号
    return userStore?.userInfo?.accountType ? '技术专用' : `代理用户${agentName ? '-' + agentName : ''}`
  }),
  device: computed(() => {
    return appStore.device
  }),
  agentTypeName: computed(() => {
    const type = userStore?.userInfo?.agentType
    let userName = '管理员'
    switch (type) {
      case 0:
        userName = '管理员'
        break
      case 1:
        userName = '普通代理'
        break
      case 2:
        userName = '扶持代理'
        break
      case 3:
        userName = '无条件扶持代理'
        break
      case 4:
        userName = '团队代理'
        break
    }
    return userName
  }),

  checkFormRef11: null,
  checkDia: false,
  checkForm: {
    account: '',
    amount: '',
    withdrawType: '',
    typeRecordId: '',
    phone: '',
    verifyCode: '',
  },
  moneysData: 0,
  verificationD: false,
  numbers: 60,
  agentAccount: '',

  optionData1: [],
  optionData2: [],
})
const { checkForm, checkDia, checkFormRef11 } = toRefs(set)
const personal = () => {
  router.push({ name: 'personalCenter', query: { id: '1' } })
  // router.push('personalCenter')
}

// 跳转绑定卡
const clicks1 = () => {
  cancelDia()
  router.push({ name: 'personalCenter', query: { id: '3' } })
}

const getBalanceInfos = () => {
  // 获取余额
  getBalanceInfo().then(item => {
    if (item.code === 200) {
      set.moneysData = item.data.availableBalance
    }
  })
}

const modify = () => {
  getBalanceInfos()
  set.agentAccount = JSON.parse(sessionStorage.getItem('userInfo')).agentAccount
  // 银行卡
  getBankList().then(item => {
    if (item.code === 200) {
      set.optionData1 = item.rows
    }
  })
  // 获取虚拟币
  getWalletList().then(item => {
    set.optionData2 = item.rows
  })
  set.checkDia = true
}
// 取消
const cancelDia = () => {
  checkFormRef11.value.resetFields()
  checkDia.value = false
}
// 确定
const addForm = () => {
  if (Number(set.checkForm.amount) > 0) {
    confirm(set.checkForm).then(item => {
      console.log('123', item)
      if (item.code === 200) {
        ElMessage.success('申请成功')
        cancelDia()
      } else {
        ElMessage.error(item.msg)
      }
    })
  } else {
    ElMessage.warning('请输入取款金额大于0')
  }
}
// 验证
const verification = () => {
  // 86
  // set.checkForm.countryCode
  sendSms({ phone: set.checkForm.phone, countryCode: 86 }).then(item => {
    console.log('123', item)
    if (item.code === 200) {
      set.verificationD = true
      var time
      time = setInterval(() => {
        set.numbers = set.numbers - 1
        if (set.numbers === 0) {
          clearInterval(time)
          set.verificationD = false
          set.numbers = 60
        }
      }, 1000)
    } else {
      ElMessage.error(item.msg)
    }
  })
}

// 退出登录
const logout = async () => {
  ElMessageBox.confirm('是否确认退出登录？')
    .then(async () => {
      const res = await userStore.LOGIN_OUT()
      router.push('/login')
      window.location.reload()
    })
    .catch(() => {
      // catch error
    })
}

// const openSettings = () => {
//   emitter.emit('openSettings')
// }

defineOptions({
  name: 'NavBar',
})
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 30px;
  height: 80px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .displ {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .displ-left {
      font-size: 30px;
      font-family: DINCond-Bold, DINCond;
      font-weight: bold;
      color: #5f2ae0;
      letter-spacing: 2px;
      margin-right: 100px;
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;
    display: flex;
    min-width: 280px;
    align-items: center;
    color: #000000d9;
    justify-content: flex-end;
    // padding-right: 10px;

    .icons {
      height: 100%;
      line-height: 50px;
      display: inline-block;
    }

    &:focus {
      outline: none;
    }

    .hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .p8 {
      padding: 0 8px;
    }

    .right-menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
    }

    .avatar-container {
      .avatar-wrapper {
        vertical-align: middle;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          vertical-align: middle;
          display: inline-block;
        }

        .username {
          margin-left: 12px;
          vertical-align: middle;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          position: relative;
          .username_font {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #333333;
          }
          .username_font2 {
            margin-top: 3px;
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #383131;
          }
          .username_font3 {
            margin-top: 3px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #383131;
          }
        }

        .arrow {
          // cursor: pointer;
          // position: absolute;
          // right: -20px;
          // top: 0;
          margin-left: 24px;
          img {
            width: 12px;
            height: 9px;
          }
        }
      }
    }

    .el-icon-setting {
      font-size: 16px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .setting {
        color: #000;
      }
    }
  }

  &.horizontal-nav-section {
    height: 50px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    .hamburger-container {
      display: none;
    }

    .horizontal-sidebar-container {
      flex: 1 1;
      min-width: 0;
      height: 50px;
      background: rgba(0, 0, 0, 0.2);
      position: relative !important;
      align-items: center;
      .horizontal-logo {
        float: left;
        width: 210px;
      }
      .sidebar-menus {
        float: left;
        width: calc(100% - 210px) !important;
      }
      .scrollbar-wrapper {
      }
      ::v-deep(.el-menu) {
        .el-menu-item,
        .submenu-title-noDropdown,
        .el-sub-menu__title {
          height: 50px;
          line-height: 50px;
        }
      }
    }

    .right-menu {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      /*min-width: 690px;*/
      color: #fff;
      ::v-deep(.header-search) {
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
      ::v-deep(.svg-icon) {
        color: #fff;
      }
      .icons {
        color: #fff;
      }

      .hover-effect {
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
      .right-menu-item {
        color: #fff;
      }
      .el-icon-setting {
        .setting {
          color: #fff;
        }
      }
    }
  }
}
.right-menu-qh {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  margin-right: 100px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    border-radius: 100%;
  }
  span {
    margin-left: 8px;
    margin-right: 3px;
  }
  .right-menu-qh2 {
    font-size: 14px;
  }
}
.inputs1 {
  height: 42px;
}
.but {
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
.moneys {
  width: calc(100% - 40px);
  margin: auto;
  height: 50px;
  background: linear-gradient(134deg, #ffbc00 0%, #ff8700 100%);
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
