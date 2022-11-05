import http from '@/utils/request'

// 推广域名管理列表
export function list(query) {
    return http.request({
        url: '/api/agent-server/agent/promote/list',
        method: 'get',
        data: query
    })
}
// export function list(data) {
//     return http.request({
//         url: '/api/agent/promote/list',
//         method: 'get',
//         data: data
//     })
// }

// 推广域名管理绑定域名
export function bind(data) {
    return http.request({
        url: '/api/agent-server/agent/promote/bind',
        method: 'post',
        data: data
    })
}
