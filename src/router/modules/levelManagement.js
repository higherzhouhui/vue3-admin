import Layout from '@/layout'

export default {
  path: '/LevelManagement',
  component: Layout,
  name: 'LevelManagement',
  redirect: '/LevelManagement/capital-channel',
  meta: { title: '等级管理', icon: 'list_left_ic_grade' },
  children: [
    {
      path: 'capital-channel',
      component: () => import('@/views/LevelManagement/capital-channel'),
      name: 'capitalChannel',
      hidden: false,
      meta: { title: '资金通道', noCache: true }
    },
    {
      path: 'trade-level',
      component: () => import('@/views/LevelManagement/trade-level'),
      name: 'tradeLevel',
      hidden: false,
      meta: { title: '交易等级', noCache: true }
    },
    {
      path: 'trade-level-add',
      component: () => import('@/views/LevelManagement/trade-level-detail'),
      name: 'tradeLevelDetail',
      hidden: true,
      meta: { title: '添加', noCache: true, activeMenu: '/LevelManagement/trade-level' }
    },
    {
      path: 'user-trade-level',
      component: () => import('@/views/LevelManagement/user-trade-level'),
      name: 'userTradeLevel',
      hidden: false,
      meta: { title: '用户交易等级', noCache: true }
    }
  ]
}
