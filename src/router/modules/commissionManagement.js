import Layout from '@/layout'
import gy from '../../assets/imgs/sy/gy.png'
import gys from '../../assets/imgs/sy/gys.png'

export default {
    path: '/CommissionManagement',
    component: Layout,
    name: 'CommissionManagement',
    redirect: '/CommissionManagement/subordinate-agent',
    meta: { title: '佣金明细', icon: [gy, gys] },
    children: [
        {
            path: 'my-commission',
            component: () => import('@/views/CommissionManagement/myCommission'),
            name: 'myCommission',
            hidden: false,
            meta: { title: '我的佣金统计', noCache: true }
        },
        {
            path: 'team-commission',
            component: () => import('@/views/CommissionManagement/teamCommission'),
            name: 'teamCommission',
            hidden: false,
            meta: { title: '团队佣金统计表', noCache: true }
        },
        {
            path: 'history-commission',
            component: () => import('@/views/CommissionManagement/historyCommission'),
            name: 'historyCommission',
            hidden: false,
            meta: { title: '历史佣金计算明细', noCache: true }
        },
    ]
}
