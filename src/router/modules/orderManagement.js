import Layout from '@/layout'

export default {
  path: '/OrderManagement',
  component: Layout,
  name: 'OrderManagement',
  redirect: '/OrderManagement/order-list',
  meta: { title: '订单管理', icon: 'list_left_ic_order' },
  children: [
    {
      path: 'order-list',
      component: () => import('@/views/OrderManagement/order-list'),
      name: 'orderList',
      hidden: false,
      meta: { title: '订单列表', noCache: true }
    },
    {
      path: 'appeal-order',
      component: () => import('@/views/OrderManagement/appeal-order'),
      name: 'appealOrder',
      hidden: false,
      meta: { title: '申诉订单', noCache: true }
    },
    {
      path: 'appeal-order-detail/:id(\\d+)',
      component: () => import('@/views/OrderManagement/appeal-order-detail'),
      name: 'appealOrderDetail',
      meta: { title: '订单详情', noCache: true, activeMenu: '/OrderManagement/appeal-order' },
      hidden: true
    },
    {
      path: 'pending-list',
      component: () => import('@/views/OrderManagement/pending-list'),
      name: 'pendingList',
      hidden: false,
      meta: { title: '挂单列表', noCache: true }
    },
    {
      path: 'pending-list-detail/:id(\\d+)',
      component: () => import('@/views/OrderManagement/pending-list-detail'),
      name: 'pendingListDetail',
      meta: { title: '挂单详情', noCache: true, activeMenu: '/OrderManagement/pending-list' },
      hidden: true
    }
  ]
}
