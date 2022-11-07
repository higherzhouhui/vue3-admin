import { defineStore } from 'pinia'
import cookies from '@/utils/cookies'
import { TOKEN, AVATAR } from '@/config/constant'
import { logout, getInfo, login } from '@/api/user'
import router, { resetRouter } from '@/router'
import useTagsViewStore from './tagsView'
import { ElMessage } from 'element-plus';
import { agentTypeDic } from '@/utils/index';

const useUserStore = defineStore({
  id: 'users',
  state: () => {
    return {
      token: cookies.get(TOKEN),
      userInfo: cookies.get(TOKEN) ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      uid: '',
      avatar: AVATAR,
      name: '',
      phone: '',
      email: '',
      identity: '',
      roles: [],
      account: '',
      permissions: [],
      createTime: '',
      rolesType: '',
      validTime: '',
      qq: '',
      availableBalance: '',
      needUserParam: {},
    }
  },
  actions: {
    SET_TOKEN(token = '') {
      token ? cookies.set(TOKEN, token) : cookies.remove(TOKEN)
      this.token = token
    },
    SET_ROLE_INFO() {
      // userInfo
      this.roles = this.userInfo.roles
      this.permissions = this.userInfo.permissions
      return this.roles
    },
    async LOGIN(params) {
      console.log('这是多少params', params);
      const cres = await login(params)
      // 可根据传回ID赋予权限;jackesy
      const { accountType } = cres;
      let res = {...cres, roles: [accountType ? 'superAdmin' : 'admin']};
      if (cres !== null) {
        console.log('这是多少result', res);
        const { code, msg } = res;
        // 由于成功和失败返回的数据结构不同需要特殊处理
        if (!code) {
          ElMessage.success('登录成功');
          sessionStorage.setItem('userInfo', JSON.stringify(res))
          this.userInfo = res;
          this.SET_TOKEN(res.token)
          router.push('/')
        } else {
          ElMessage.error(msg || '登录错误')
        }
      } else {
        ElMessage.error('登录错误')
      }
    },
    async GET_USER_INFO() {
      try {
        const { code, data } = await getInfo()
        if (code == 200) {
          const { agentId, agentName, agentAccount, phone, agentType, validTime, createTime, qq, availableBalance } = data;
          this.qq = qq;
          this.account = agentAccount;
          this.uid = agentId || '9527';
          this.name = agentName || '';
          this.phone = phone || '';
          this.createTime = createTime;
          this.validTime = validTime || '永久有效';
          this.rolesType = agentTypeDic[agentType];
          this.availableBalance = availableBalance;
        }
      } catch (error) {
        return error
      }
    },
    async LOGIN_OUT() {
      try {
        this.RESET_INFO()
        // const data = await logout()
        // if (data.code == 200) {
        this.token = ''
        this.name = ''
        this.avatar = ''
        this.phone = ''
        this.email = ''
        this.identity = ''
        this.roles = []
        this.RESET_INFO()
        // }
      } catch (error) {
        return error
      }
    },
    // 清空所有登录信息
    RESET_INFO() {
      return new Promise(resolve => {
        const tagsViewStore = useTagsViewStore()
        cookies.clearAll()
        sessionStorage.clear()
        resetRouter()
        tagsViewStore.DEL_ALL_VIEWS(null)
        resolve()
      })
    }
  }
})
export default useUserStore
