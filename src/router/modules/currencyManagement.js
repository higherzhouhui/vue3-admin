import Layout from '@/layout'

export default {
  path: '/currencyManagement',
  component: Layout,
  name: 'CurrencyManagement',
  redirect: '/CurrencyManagement/currency-list',
  meta: { title: '参数配置', icon: 'list_left_ic_money' },
  children: [
    {
      path: 'currency-list',
      component: () => import('@/views/CurrencyManagement/currency-list'),
      name: 'currencyList',
      hidden: false,
      meta: { title: '币种参数', noCache: true }
    },
    {
      path: 'price-list',
      component: () => import('@/views/CurrencyManagement/price-list'),
      name: 'priceList',
      hidden: false,
      meta: { title: '卖价参数', noCache: true }
    },
    {
      path: 'order-time',
      component: () => import('@/views/CurrencyManagement/order-time'),
      name: 'orderTime',
      hidden: false,
      meta: { title: '订单时间参数', noCache: true }
    },
    {
      path: 'config-list',
      component: () => import('@/views/CurrencyManagement/config-list'),
      name: 'configList',
      hidden: false,
      meta: { title: '全局系统参数', noCache: true }
    }
  ]
}
