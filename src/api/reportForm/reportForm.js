import http from '@/utils/request'

// 游戏输赢报表
export function agentGameStatis(query) {
    return http.request({
        url: '/api/commission-server/agent/agentGameStatis',
        method: 'post',
        data: query
    })
}

// 游戏分类统计
export function agentGameTypeStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/agentGameTypeStatis',
        method: 'post',
        data: data
    })
}

// 活动红利报表
export function activityBonusStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/activityBonusStatis',
        method: 'post',
        data: data
    })
}

// 平台费报表
export function gamePlatformStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/gamePlatformStatis',
        method: 'post',
        data: data
    })
}

// 主播打赏抽成报表
export function giftCommissionStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/giftCommissionStatis',
        method: 'post',
        data: data
    })
}

// 代理佣金调整统计
export function commissionModifyStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/commissionModifyStatis',
        method: 'post',
        data: data
    })
}
// 代理佣金调整明细
export function commissionModifyRecord(data) {
    return http.request({
        url: '/api/commission-server/agent/commissionModifyRecord',
        method: 'post',
        data: data
    })
}
// 直属会员佣金报表
export function memberCommissionStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/memberCommissionStatis',
        method: 'post',
        data: data
    })
}


// 定时任务立即执行一次
export function runJob(jobId, jobGroup) {
    const data = {
        jobId,
        jobGroup
    }
    return http.request({
        url: '/api/agent-job/job/run',
        method: 'put',
        data: data
    })
}