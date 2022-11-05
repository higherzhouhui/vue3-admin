import Layout from '@/layout'

export default {
  path: '/RiskManagement',
  component: Layout,
  name: 'RiskManagement',
  redirect: '/RiskManagement/condition-manage',
  meta: { title: '风控管理', icon: 'list_left_ic_control' },
  children: [
    {
      path: 'condition-manage',
      component: () => import('@/views/RiskManagement/condition-manage'),
      name: 'conditionManage',
      hidden: false,
      meta: { title: '条件管理', noCache: true }
    },
    {
      path: 'rule-manage',
      component: () => import('@/views/RiskManagement/rule-manage'),
      name: 'ruleManage',
      hidden: false,
      meta: { title: '规则管理', noCache: true }
    },
    {
      path: 'black-list-manage',
      component: () => import('@/views/RiskManagement/black-list-manage'),
      name: 'blackListManage',
      hidden: false,
      meta: { title: '黑名单管理', noCache: true }
    },
    {
      path: 'abnormal-account',
      component: () => import('@/views/RiskManagement/abnormal-account'),
      name: 'abnormalAccount',
      hidden: false,
      meta: { title: '异常账户跟踪', noCache: true }
    },
    {
      path: 'abnormal-action',
      component: () => import('@/views/RiskManagement/abnormal-action'),
      name: 'abnormalAction',
      hidden: false,
      meta: { title: '异常行为跟踪', noCache: true }
    }
  ]
}
