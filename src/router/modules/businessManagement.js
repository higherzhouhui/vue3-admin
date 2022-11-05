import Layout from '@/layout'

export default {
  path: '/BusinessManagement',
  component: Layout,
  name: 'BusinessManagement',
  redirect: '/BusinessManagement/business-list',
  meta: { title: '商家管理', icon: 'list_left_ic_business' },
  children: [
    {
      path: 'business-list',
      component: () => import('@/views/BusinessManagement/business-list'),
      name: 'businessList',
      hidden: false,
      meta: { title: '商家列表', noCache: true }
    },
    {
      path: 'business-list-detail/:id(\\d+)',
      component: () => import('@/views/BusinessManagement/business-list-detail'),
      name: 'businessListDetail',
      meta: { title: '商家详情', noCache: true, activeMenu: '/BusinessManagement/business-list' },
      hidden: true
    },
    {
      path: 'advertising-list',
      component: () => import('@/views/BusinessManagement/advertising-list'),
      name: 'advertisingList',
      hidden: false,
      meta: { title: '广告记录', noCache: true }
    },
    {
      path: 'advertising-list-detail/:id(\\d+)',
      component: () => import('@/views/BusinessManagement/advertising-list-detail'),
      name: 'advertisingListDetail',
      meta: { title: '商家详情', noCache: true, activeMenu: '/BusinessManagement/advertising-list' },
      hidden: true
    }
  ]
}
