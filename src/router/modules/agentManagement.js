import Layout from '@/layout'
import dl from '../../assets/imgs/sy/dl.png'
import dls from '../../assets/imgs/sy/dls.png'

export default {
    path: '/AgentManagement',
    component: Layout,
    name: 'AgentManagement',
    redirect: '/AgentManagement/subordinate-agent',
    meta: { title: '代理列表', icon: [dl, dls] },
    children: [
        {
            path: 'subordinate-agent',
            component: () => import('@/views/AgentManagement/subordinateAgent'),
            name: 'subordinateAgent',
            hidden: false,
            meta: { title: '下级代理', noCache: true }
        },
        {
            path: 'subordinate-member',
            component: () => import('@/views/AgentManagement/subordinateMember'),
            name: 'subordinateMember',
            hidden: false,
            meta: { title: '下级会员', noCache: true }
        },
    ]
}
