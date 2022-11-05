<template>
  <div class="login-container">
    <div class="login-container-div1 login-bj2">
      <div class="login-title-left">
        <img src="../../assets/imgs/login-title.png" alt="" />
        <span>FBS Live</span>
      </div>
      <div class="login-title-left2">
        <div>一站式服务</div>
        <div class="login-title-left2-font">资金、报表、会员一站式服务</div>
      </div>
    </div>
    <div class="login-container-div1 login-bj">
      <LangSelect class="right-menu-qh" />
      <div>
        <div class="title">👋欢迎来到代理系统</div>
        <login-pwd />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
import { isMobile } from '@/utils/device'
import { debounce } from 'lodash-unified'
// import WeChatLogin from './components/weChatLogin'
import LoginPwd from './loginPwd.vue'
import LangSelect from '../../layout/components/navbar/components/LangSelect.vue'

const isShowWX = ref(true)

const resizeCb = debounce(() => {
  isShowWX.value = !isMobile()
}, 50)

onBeforeMount(() => {
  isShowWX.value = !isMobile()
})

onMounted(() => {
  window.addEventListener('resize', resizeCb)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCb)
})

defineOptions({
  name: 'Login',
})
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: url('../../assets/imgs/lgoin-bj.png');
  background-size: 100% 100%;
  .login-container-div1 {
    width: 50%;
    height: 100%;
    position: relative;
  }
  .login-bj2 {
    background: url('../../assets/imgs/login-bj2.png');
    background-size: 100% 100%;
  }
  .login-bj {
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 40px;
      font-family: AppleColorEmoji;
      color: #333333;
      margin-bottom: 42px;
    }
  }
}
.login-title-left {
  font-size: 50px;
  font-family: DINCond-Bold, DINCond;
  font-weight: bold;
  color: #ffffff;

  position: absolute;
  top: 50px;
  left: 50px;
  img {
    width: 55px;
    height: 55px;
    margin-right: 20px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-title-left2 {
  position: absolute;
  top: 30%;
  left: 40%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  font-size: 50px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  .login-title-left2-font {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    margin-top: 28px;
  }
}

.right-menu-qh {
  position: absolute;
  top: 93px;
  right: 100px;
}
</style>
