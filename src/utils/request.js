'use strict'
import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { getEnvs } from './envs'
import cookies from '@/utils/cookies'
import router from '@/router'
import { useUserStore } from '@/store'
import { blobValidate, tansParams } from '@/utils/ruoyi'

import { TOKEN, WHITE_CODE_LIST, LOGIN_ERROR_CODE, GLOBAL_DATA } from '@/config/constant'
import { saveAs } from 'file-saver'

import qs from 'qs'
let downloadLoadingInstance;
class HttpRequest {
  // #baseUrl
  constructor() {
    this.baseUrl = '';
    // this.baseUrl = this.getBaseUrl();
    this.withCredentials = false
    this.timeout = 60 * 60 * 24 * 1000
  }

  getBaseUrl() {
    const { envStr } = getEnvs()
    // const baseUrlStr = envStr === 'dev' ? import.meta.env.VITE_PROXY_DOMAIN_REAL : GLOBAL_DATA[envStr].baseUrl
    const baseUrlStr = envStr === 'dev' ? 'http://34.150.29.102:8086/' : 'http://34.150.29.102:8086/'
    // const baseUrlStr = envStr === 'dev' ? '/api' : '/api'
    return baseUrlStr
  }

  getConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: cookies.get(TOKEN)
      },
      body: {}
    }
    return config
  }

  getParams(payload) {
    const { method, data } = payload
    // else if (['delete'].indexOf(method) >= 0) {
    //   payload.url = `${payload.url}}`
    // }
    if (['post', 'patch', 'put'].indexOf(method) >= 0) {
      payload.data = data
    } else {
      payload.params = data
      delete payload.data
    }
    return payload
  }

  checkStatus(status) {
    let errMessage = ''
    const userStore = useUserStore()
    switch (status) {
      case 400:
        errMessage = '错误请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        userStore.RESET_INFO()
        router.push('/login')
        window.location.reload()
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = '连接错误'
    }
    return errMessage
  }

  // 拦截处理
  setInterceptors(instance) {
    const that = this
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        if (!navigator.onLine) {
          ElMessage({
            message: '请检查您的网络是否正常',
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(new Error('请检查您的网络是否正常'))
        }
        // config.data = qs.stringify(config.data)

        return config
      },
      error => {
        return Promise.reject(new Error(error))
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      cres => {
        let res = cres;
        if (res?.config.url === '/myownFBSlive/agent-server/agent/user/login') {
          res = res.data;
        }
        const result = res.data;
        const type = Object.prototype.toString.call(result)

        // 如果是文件流 直接返回
        if (type === '[object Blob]' || type === '[object ArrayBuffer]' || type === '[object Object]') {
          return result;
        } else {
          const { code, message } = result
          const isErrorToken = LOGIN_ERROR_CODE.find(item => item.code == code)
          const isWhiteCode = WHITE_CODE_LIST.find(item => item.code == code)
          const userStore = useUserStore()
          if (isErrorToken) {
            userStore.LOGIN_OUT()
            router.push('/login')
            window.location.reload()
          }
          if (!result) {
            ElMessage({
              message: message || 'Error',
              type: 'error',
              duration: 3 * 1000
            })
            return Promise.reject(new Error(message || 'Error'))
          } else {
            return result.data
          }
        }

        return result
      },
      error => {
        if (error && error.response) {
          error.message = that.checkStatus(error.response.status)
        }
        const isTimeout = error.message.includes('timeout')
        ElMessage({
          message: isTimeout ? '网络请求超时' : error.message || '连接到服务器失败',
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(new Error(error.message))
      }
    )
  }

  request(options) {
    const instance = axios.create()
    const baseOpt = this.getConfig()
    const params = Object.assign({}, baseOpt, this.getParams(options))
    this.setInterceptors(instance)
    return instance(params)
  }
}



const http = new HttpRequest()
export default http

// 通用下载方法
export function download(url, params, filename) {
  downloadLoadingInstance = ElLoading.service({
    text: "正在下载数据，请稍候",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  // 有问题
  return axios
    .post(url, params, {
      transformRequest: [
        (params) => {
          return tansParams(params);
        },
      ],
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "blob",
    })
    .then(async (data) => {
      const isLogin = await blobValidate(data);
      if (isLogin) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg =
          errorCode[rspObj.code] || rspObj.msg || errorCode["default"];
        ElMessage.error(errMsg);
      }
      downloadLoadingInstance.close();
    })
    .catch((r) => {
      console.error(r);
      ElMessage.error("下载文件出现错误，请联系管理员！");
      downloadLoadingInstance.close();
    });
}
