import Layout from '@/layout'

export default {
  path: '/TradeSystemManagement',
  component: Layout,
  name: 'TradeSystemManagement',
  redirect: '/TradeSystemManagement/whole-function',
  meta: { title: '交易系统管理', icon: 'list_left_ic_transaction' },
  children: [
    {
      path: 'whole-function',
      component: () => import('@/views/TradeSystemManagement/whole-function'),
      name: 'wholeFunction',
      hidden: false,
      meta: { title: '全局系统功能开关', noCache: true }
    },
    {
      path: 'user-function',
      component: () => import('@/views/TradeSystemManagement/user-function'),
      name: 'userFunction',
      meta: { title: '用户功能控制开关', noCache: true },
      hidden: false
    }
  ]
}
