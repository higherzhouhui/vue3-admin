import Layout from '@/layout'

export default {
  path: '/SystemManagement',
  component: Layout,
  name: 'SystemManagement',
  redirect: '/SystemManagement/member-account',
  meta: { title: '系统设置', icon: 'list_left_ic_setup' },
  children: [
    {
      path: 'member-account',
      component: () => import('@/views/SystemManagement/member-account'),
      name: 'ConditionManage',
      hidden: false,
      meta: { title: '成员账号', noCache: true }
    },
    {
      path: 'role-authorization',
      component: () => import('@/views/SystemManagement/role-authorization'),
      name: 'roleAuthorization',
      hidden: false,
      meta: { title: '角色权限', noCache: true }
    },
    {
      path: 'role-authorization-add',
      component: () => import('@/views/SystemManagement/role-authorization-form'),
      name: 'roleAuthorizationForm',
      hidden: true,
      meta: { title: '新增角色权限', noCache: true, activeMenu: '/SystemManagement/role-authorization-add' }
    },
    {
      path: 'operation-log',
      component: () => import('@/views/SystemManagement/operation-log'),
      name: 'operationLog',
      hidden: false,
      meta: { title: '操作日志', noCache: true }
    }
  ]
}
