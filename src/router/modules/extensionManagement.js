import Layout from '@/layout'
import lj from '../../assets/imgs/sy/lj.png'
// import ljs from '../../assets/imgs/sy/ljs.png'
export default {
    path: '/ExtensionManagement',
    component: Layout,
    name: 'ExtensionManagement',
    redirect: '/ExtensionManagement/extensionDomainName',
    meta: { title: '推广链接管理', icon: lj },
    children: [
        {
            path: 'extension-domainName',
            component: () => import('@/views/ExtensionManagement/extensionDomainName'),
            name: 'extensionDomainName',
            hidden: false,
            meta: { title: '推广域名配置', noCache: true }
        },

    ]
}
