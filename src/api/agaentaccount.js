import http from '@/utils/request';

// 添加子代理
export function addChildAgent(data) {
    return http.request({
        url: '/myownFBSlive/agent-server/agent/user/addChildAgent',
        method: 'post',
        data: data,
    })
}


// 下级代理列表
export function getAgaentList(data) {
    return http.request({
        url: '/myownFBSlive/agent-server/agent/user/pageList',
        method: 'post',
        data: data,
    })
}

// 下级会员列表
export function getNumberList(data) {
    return http.request({
        url: '/myownFBSlive/agent-server/agent/user/directMemberList',
        method: 'post',
        data: data,
    })
}