/*
 * @Author: askMeWhy
 * @Date:   2018-07-05 09:57:53
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-06-18 16:39:11
 */
/*
调用方式 [namespace/name]
有namespace=>[namespace/name]
无namespace=>[name]

{
    name: '', //函数名
    namespace: '', //命名空间
    noPublicParam: true, //接口不需要带上公共参数 默认为false
    method:'GET', //请求方式
    params:{}, //本接口在未设置的时候请求带上的默认值
    path:'', //接口api地址
    desc:'' //接口描述信息
}
 */

const API_CONFIG = [{
        name: 'userInfo',
        namespace: '',
        noPublicParam: true,
        method: 'GET',
        params: {},
        path: '/game/account/:type/:name',
        mock: {
            path: '/mock/list',
            open: false
        },
        desc: '用户信息'
}, {
        name: 'rankings',
        namespace: '',
        noPublicParam: true,
        method: 'GET',
        params: {},
        path: '/game/rank/award_today',
        mock: {
            path: '/mock/list',
            open: false
        },
        desc: '排行榜信息'
}, {
        name: 'inviteHistory',
        namespace: '',
        noPublicParam: true,
        method: 'GET',
        params: {},
        path: '/game/account/award_history/:accountId/:type',
        mock: {
            path: '/mock/list',
            open: false
        },
        desc: '邀请记录信息'
}, {
        name: 'inviteCode',
        namespace: '',
        noPublicParam: true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        params: {},
        path: '/game/account/invite_code',
        mock: {
            path: '/mock/list',
            open: false
        },
        desc: '提交邀请码'
},
    {
        name: 'detail',
        namespace: '',
        noPublicParam: true,
        method: 'post',
        params: {},
        path: '/mock/detail',
        mock: {
            path: '/mock/detail',
            open: true
        },
        desc: '测试数据'
    }
];
export default API_CONFIG;
