import Layout from '@/layout'
import ba from '../../assets/imgs/sy/ba.png'
import bas from '../../assets/imgs/sy/bas.png'
export default {
    path: '/ReportFormManagement',
    component: Layout,
    name: 'ReportFormManagement',
    redirect: '/ReportFormManagement/subordinate-agent',
    meta: { title: '报表中心', icon: [ba, bas] },
    children: [
        {
            path: 'game-reportForm',
            component: () => import('@/views/ReportFormManagement/gameReportForm'),
            name: 'gameReportForm',
            hidden: false,
            meta: { title: '游戏输赢总报表', noCache: true }
        },
        {
            path: 'game-classification',
            component: () => import('@/views/ReportFormManagement/gameClassification'),
            name: 'gameClassification',
            hidden: false,
            meta: { title: '游戏分类统计表', noCache: true }
        },
        {
            path: 'activity-reportForm',
            component: () => import('@/views/ReportFormManagement/activityReportForm'),
            name: 'activityReportForm',
            hidden: false,
            meta: { title: '活动红利报表', noCache: true }
        },
        {
            path: 'drawing-reportForm',
            component: () => import('@/views/ReportFormManagement/drawingReportForm'),
            name: 'drawingReportForm',
            hidden: false,
            meta: { title: '直属会员佣金报表', noCache: true }
        },


        // 新加
        {
            path: 'subordinate-reportForm',
            component: () => import('@/views/ReportFormManagement/subordinateReportForm'),
            name: 'subordinateReportForm',
            hidden: false,
            meta: { title: '下级代理抽成报表', noCache: true }
        },
        {
            path: 'anchor-reportForm',
            component: () => import('@/views/ReportFormManagement/anchorReportForm'),
            name: 'anchorReportForm',
            hidden: false,
            meta: { title: '主播打赏抽成报表', noCache: true }
        },
        {
            path: 'commission-reportForm',
            component: () => import('@/views/ReportFormManagement/commissionReportForm'),
            name: 'commissionReportForm',
            hidden: false,
            meta: { title: '代理佣金调整统计', noCache: true }
        },
        {
            path: 'commission-detailed',
            component: () => import('@/views/ReportFormManagement/commissionDetailed'),
            name: 'commissionDetailed',
            hidden: false,
            meta: { title: '代理佣金调整明细', noCache: true }
        },
        {
            path: 'platform-reportForm',
            component: () => import('@/views/ReportFormManagement/platformReportForm'),
            name: 'platformReportForm',
            hidden: false,
            meta: { title: '平台费报表', noCache: true }
        },
        {
            path: 'myCommission-reportForm',
            component: () => import('@/views/ReportFormManagement/myCommissionReportForm'),
            name: 'myCommissionReportForm',
            hidden: false,
            meta: { title: '我的佣金结算报表', noCache: true }
        },
        {
            path: 'myCommissionReceive-reportForm',
            component: () => import('@/views/ReportFormManagement/myCommissionReceiveReportForm'),
            name: 'myCommissionReceiveReportForm',
            hidden: false,
            meta: { title: '我的佣金领取明细', noCache: true }
        },
    ]
}
