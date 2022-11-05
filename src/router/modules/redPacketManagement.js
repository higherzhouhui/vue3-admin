import Layout from '@/layout'

export default {
    path: '/RedPacketManagement',
    component: Layout,
    name: 'RedPacketManagement',
    redirect: '/RedPacketManagement/cover',
    meta: { title: '红包管理', icon: 'list_left_ic_setup' },
    children: [
        {
            path: 'cover',
            component: () => import('@/views/RedPacketManagement/cover'),
            name: 'Cover',
            hidden: false,
            meta: { title: '红包封面', noCache: true }
        },
        {
            path: 'category',
            component: () => import('@/views/RedPacketManagement/category'),
            name: 'Category',
            hidden: false,
            meta: { title: '红包类别', noCache: true }
        },
        {
            path: 'limit',
            component: () => import('@/views/RedPacketManagement/limit'),
            name: 'Limit',
            hidden: false,
            meta: { title: '红包数额', noCache: true, }
        },
        {
            path: 'log',
            component: () => import('@/views/RedPacketManagement/log'),
            name: 'Log',
            hidden: false,
            meta: { title: '红包记录', noCache: true }
        },
        {
            path: 'log-detail/:id',
            component: () => import('@/views/RedPacketManagement/log-detail'),
            name: 'LogDetail',
            meta: { title: '商家详情', noCache: true, activeMenu: '/RedPacketManagement/log' },
            hidden: true
          }
    ]
}
