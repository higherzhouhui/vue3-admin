import Layout from '@/layout'

export default {
  path: '/UserManagement',
  component: Layout,
  name: 'UserManagement',
  redirect: '/UserManagement/user-list',
  meta: { title: '首页概况', icon: 'list_left_ic_user' },
  children: [
    {
      path: 'user-list',
      component: () => import('@/views/UserManagement/user-list'),
      name: 'userList',
      hidden: false,
      meta: { title: '用户列表', noCache: true }
    },
    {
      path: 'user-detail/:id(\\d+)',
      component: () => import('@/views/UserManagement/user-detail'),
      name: 'userDetail',
      meta: { title: '用户详情', noCache: true, activeMenu: '/UserManagement/user-list' },
      hidden: true
    },
    {
      path: 'user-asset',
      component: () => import('@/views/UserManagement/user-asset'),
      name: 'userAsset',
      hidden: false,
      meta: { title: '用户资产', noCache: true }
    },
    {
      path: 'collection-record',
      component: () => import('@/views/UserManagement/collection-record'),
      name: 'CollectionRecord',
      hidden: false,
      meta: { title: '收款记录', noCache: true }
    },
    {
      path: 'transfer-record',
      component: () => import('@/views/UserManagement/transfer-record'),
      name: 'TransferRecord',
      hidden: false,
      meta: { title: '转账记录', noCache: true }
    },
    {
      path: 'transfer-record-detail/:id(\\d+)',
      component: () => import('@/views/UserManagement/transfer-record-detail'),
      name: 'TransferRecordDetail',
      hidden: true,
      meta: { title: '转账详情', noCache: true, activeMenu: '/UserManagement/transfer-record' }
    },
    {
      path: 'address-manage',
      component: () => import('@/views/UserManagement/address-manage'),
      name: 'AddressManage',
      hidden: false,
      meta: { title: '地址薄管理', noCache: true }
    },
    {
      path: 'password-manage',
      component: () => import('@/views/UserManagement/password-manage'),
      name: 'PasswordManage',
      hidden: false,
      meta: { title: '密码管理', noCache: true }
    },
    {
      path: 'mobile-manage',
      component: () => import('@/views/UserManagement/mobile-manage'),
      name: 'MobileManage',
      hidden: false,
      meta: { title: '手机号管理', noCache: true }
    },
    {
      path: 'email-manage',
      component: () => import('@/views/UserManagement/email-manage'),
      name: 'EmailManage',
      hidden: false,
      meta: { title: '邮箱管理', noCache: true }
    },
    {
      path: 'google-manage',
      component: () => import('@/views/UserManagement/google-manage'),
      name: 'GoogleManage',
      hidden: false,
      meta: { title: '谷歌验证管理', noCache: true }
    },
    {
      path: 'bank-manage',
      component: () => import('@/views/UserManagement/bank-manage'),
      name: 'BankManage',
      hidden: false,
      meta: { title: '银行卡管理', noCache: true }
    }
  ]
}
