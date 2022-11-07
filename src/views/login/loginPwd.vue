<template>
  <el-form
    ref="ruleForm"
    label-position="top"
    :model="formState"
    :rules="rules"
    label-width="0"
    status-icon
    class="login-ruleForm"
  >
    <el-form-item prop="account" label="用户名">
      <el-input
        ref="account"
        v-model="formState.account"
        name="account"
        placeholder="请输入用户账号"
        :clearable="true"
        tabindex="1"
        type="text"
        maxlength="100"
        autocomplete="off"
        style="width: 500px; height: 50px"
        class="inputs"
      />
    </el-form-item>

    <el-form-item prop="password" label="登录密码">
      <el-input
        ref="password"
        v-model="formState.password"
        show-password
        name="password"
        placeholder="请输入登录密码"
        :clearable="true"
        tabindex="2"
        maxlength="16"
        type="password"
        autocomplete="off"
        @keyup.enter="loginHandle"
        style="width: 500px; height: 50px"
        class="inputs"
      />
    </el-form-item>

    <el-form-item prop="captcha" label="验证码">
      <div style="position: relative">
          <el-input
            ref="captcha"
            v-model="formState.captcha"
            type="text"
            name="captcha"
            placeholder="请输入验证码"
            :clearable="true"
            tabindex="3"
            maxlength="6"
            autocomplete="off"
            @keyup.enter="loginHandle"
            style="width: 370px; height: 50px; margin-right: 20px;"
            class="inputs"
          />
        <div class="code" v-loading="!captchaImg">
          <img :src="captchaImg" alt="" @click="updateImage" />
        </div>
        <!-- <div class="code" @click="refreshCode">
          <SIdentify :identifyCode="identifyCode" />
        </div> -->
      </div>
    </el-form-item>

    <el-form-item style="margin-bottom: 0">
      <el-button
        :loading="loading"
        :disabled="disabledLogin"
        style="
          width: 100%;
          height: 58px;
          border-radius: 30px;
          background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
          border: none;
          margin-top: 30px;
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
        "
        @click.prevent="loginHandle"
      >
        登录
      </el-button>

      <!-- <el-link
        type="primary"
        :underline="false"
        :loading="loading"
        class=""
        style="width: 100%; margin: 15px"
        @click.prevent="freeLogin"
      >
        免登录
      </el-link> -->
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onBeforeMount, reactive, computed, onMounted } from 'vue'
import { useRequest } from 'ahooks-vue'
import { login, getCaptcha } from '@/api/user'
import { useUserStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import SIdentify from './components/Sidentify.vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const ruleForm = ref()
const trigger = ['blur', 'change']
const formState = reactive({
  country: '86',
  captcha: '',
  account: 'admin',
  password: '123456',
  uuid: '',
});
const rules = {
  account: [{ required: true, message: '请输入用户账号', trigger }],
  password: [{ required: true, message: '请输入登录密码', trigger }],
  captcha: [{ required: true, message: '请输入验证码', trigger }],
}
const bindToken = ref('')
const showCaptcha = ref(false)
const captchaImg = ref('')
const captchaId = ref('')
const loading = ref(false)

const disabledLogin = computed(() => {
  const { captcha, account, password } = formState
  if (showCaptcha.value) {
    return !captcha || !account || !password
  } else {
    return !account || !password
  }
})

onBeforeMount(() => {
  getQueryParams()
})

function getQueryParams() {
  const query = route.query
  // 微信 登录
  bindToken.value = query.bindToken || ''
}

// 图片验证码
async function updateImage() {
  try {
    const { code, img, uuid } = await getCaptcha();
    if (code == 200) {
      captchaImg.value = "data:image/gif;base64,"+ img;
      captchaId.value = uuid;
    }
  } catch (e) {
    captchaImg.value = ''
    captchaId.value = ''
  }
}
updateImage();
async function freeLogin() {
  loading.value = true
  try {
    const token = 'token'
    userStore.SET_TOKEN(token)
    router.push('/')
  } catch (e) {
  } finally {
    loading.value = false
  }
}

const { run: logRun } = useRequest(login, {
  manual: true,
  onSuccess(res) {
    console.log(res)
    const { token } = res.data
    userStore.SET_TOKEN(token)
    router.push('/')
  },
})
function loginHandle() {
  // const { captcha } = formState
  // if (captcha !== identifyCode.value) {
  //   ElMessage({
  //     message: '验证码错误',
  //     type: 'warning',
  //   })
  //   return
  // }
  ruleForm.value.validate(async valid => {
    if (valid) {
    loading.value = true;
      try {
        const params = {
          // username: formState.account,
          // password: formState.password,
          agentAccount: formState.account,
          password: formState.password,
          uuid: captchaId.value,
          code: formState.captcha * 1,
        }
        if (showCaptcha.value) {
          params.captchaId = captchaId.value;
          params.captchaValue = formState.captcha * 1;
        }
        userStore.LOGIN(params)
        // logRun(params)
      } catch (e) {
      } finally {
        loading.value = false
        if (showCaptcha.value) {
          await updateImage()
        }
      }
    }
  })
}

// 图形验证码
let identifyCodes = '1234567890'
let identifyCode = ref('3212')

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)]
  }
}

const refreshCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes, 4)
}

onMounted(() => {
  identifyCode.value = ''
  makeCode(identifyCodes, 4)
})

defineOptions({
  name: 'LoginPwd',
})
</script>

<style lang="scss" scoped>
.code-inp {
  // width: calc(100% - 125px);
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
}
.code {
  display: inline-block;
  height: 50px;
  width: 110px;
  cursor: pointer;
  vertical-align: middle;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  &:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
