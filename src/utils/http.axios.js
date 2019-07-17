import axios from 'axios';
import qs from 'qs';
import * as es6Promise from 'es6-promise';
import { merge } from '@/utils';
import store from '@/store';
es6Promise.polyfill();
const CancelToken = axios.CancelToken;
// const source = CancelToken.source()
let cancelArry = [];
export default async(options) => {
    let opt = {
        url: '',
        proxy: '',
        method: 'GET',
        data: {},
        loader: true,
        complete: null,
        before: null,
        headers: {}
    };
    opt = merge(true, opt, options);
    opt.method = opt.method.toUpperCase();
    if (opt.method === 'GET' || opt.method === 'DELETE') {
        // const response = await axios.get(opt.url,{params:opt.data});
        const response = await axios({
            method: opt.method,
            url: opt.url,
            params: opt.data,
            proxy: {
                loader: opt.loader
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelArry.push(c);
            }),
            responsetype: 'json',
            headers: {
                ...opt.headers
            }
        });
        return response;
    }
    if (opt.method === 'POST' || opt.method === 'PUT') {
        // const response = await axios.post(opt.url,opt.data);
        let headersContentType = opt.headers['Content-Type'] || 'application/x-www-form-urlencoded';
        let stringify = (!opt.headers['Content-Type'] ||
            opt.headers['Content-Type'] === 'application/x-www-form-urlencoded'
        );
        const response = await axios({
            method: opt.method,
            url: opt.url,
            proxy: {
                loader: opt.loader
            },
            data: stringify ? qs.stringify(opt.data) : opt.data,
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelArry.push(c);
            }),
            responsetype: 'json',
            headers: {
                'Content-Type': headersContentType,
                ...opt.headers
            }
        });
        return response;
    }
};

// 添加一个请求拦截器
axios.interceptors.request.use(function(config) {
    // 在请求发送之前做一些事
    if (config.proxy.loader) {
        store.dispatch('ajaxRequestStart');
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 添加一个返回拦截器
axios.interceptors.response.use(async function(response) {
    // 对返回的数据进行一些处理
    if (response.config.proxy.loader) {
        store.dispatch('ajaxRequestEnd');
    }
    // 判断登录是否过期,如已过期则删除登录状态
    // if(response.data.code == 101){
    //  let user = store.getters.getUser;
    //  await store.dispatch('loginOut').then(r=>{
    //      cancelArry.map(cancel=>{
    //          cancel('登录过期');
    //      })
    //  });
    //  return response;
    // }
    cancelArry.shift();
    return response;
},
function(error) {
    // 对返回的错误进行一些处理
    let _status = error.response.status;
    switch (_status) {
    case 400:
        error.message = '错误的请求';
        break;
    case 403:
        error.message = '拒绝访问';
        break;
    case 404:
        error.message = `错误的地址: ${error.response.config.url}`;
        break;
    case 408:
        error.message = '请求超时';
        break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
        error.message = '服务器错误';
        break;
    default:
        error.message = '未知错误';
        break;
    }
    if (error.response.config.proxy.loader) {
        store.dispatch('ajaxRequestEnd');
    }
    return Promise.reject(error);
});
