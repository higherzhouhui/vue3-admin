import Layout from '@/layout'

export default {
  path: '/UserAuthManagement',
  component: Layout,
  name: 'UserAuthManagement',
  redirect: '/UserAuthManagement/transfer-condition',
  meta: { title: '用户权限管理', icon: 'list_left_ic_power' },
  children: [
    {
      path: 'transfer-condition',
      component: () => import('@/views/UserAuthManagement/transfer-condition'),
      name: 'transferCondition',
      hidden: false,
      meta: { title: '转账条件管理', noCache: true }
    },
    {
      path: 'transfer-white',
      component: () => import('@/views/UserAuthManagement/transfer-white'),
      name: 'transferWhite',
      meta: { title: '转账白名单', noCache: true },
      hidden: false
    }
  ]
}
