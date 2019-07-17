/*
 * @Author: askMeWhy
 * @Date:   2018-07-05 09:47:04
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-06-17 12:58:24
 */
import { merge, ajax } from '@/utils';
import API_CONFIG from './api.js';
import { API_DEFAULT_CONFIG } from './config.js';

/**
 * 接口类
 * @DateTime 2018-07-05
 * 向外暴露 server 和 info 属性
 *
 * 调用方式
 * import Api from '@/services'
 *
 * Api.server['namespace/name']()
 * 该属性使用API_CONFIG里的配置属性封装了请求方式 最终返回一个Promise
 * Api.info['namespace/name']
 * 该属性会直接返回API_CONFIG里的配置属性，并每个配置项会多返回completePath
 * completePath: 是baseUrl加上配置的path的完整路径
 *
 */

class ServiceInstance {
    constructor(options) {
        this.server = {};
        this.info = {};
        this.baseUrl = options.BaseURL || '';
        this.apiBuild(options);
    }
    apiBuild({
        BaseURL = '',
        MockURL = '',
        config = {}
    }) {
        let _self = this;
        Object.keys(config).map(once => {
            const cur = config[once];
            // const { name, desc, params, method, path, namespace, noPublicParam, mock } = cur
            const { name, params, method, path, namespace, mock, headers } = cur;
            let apiName = `${namespace ? namespace + '/' : ''}${name}`;
            let url = '';
            if (mock !== void 0 && mock.open) {
                url = `${MockURL}${mock.path}`;
            } else {
                url = `${BaseURL}${path}`;
            }
            Object.defineProperty(this.server, apiName, {
                value(_params = { data: {}, headers: {}, param: {}, loader: true }) {
                    let _p = merge(true, {}, params, _params.data || {});
                    let _o = merge(true, {}, headers || {}, _params.headers || {});
                    let _url = url;
                    if (_self.hasUrlParam(_url)) {
                        _url = _self.buildUrlParam(url, _params.param, apiName);
                    }
                    return ajax({
                        method: method,
                        url: _url,
                        data: _p,
                        loader: _params.loader === void 0 ? true : _params.loader,
                        headers: {
                            ..._o
                        },
                        before: (r) => {},
                        complete: (r) => {}
                    });
                }
            });
            Object.defineProperty(this.info, apiName, {
                value: {
                    completePath: url,
                    ...cur
                }
            });
        });
    }
    hasUrlParam(url) {
        let reg = /\/:\w*/g;
        return url.match(reg) !== null;
    }
    buildUrlParam(url, param, apiName) {
        if (param === void 0) {
            throw Error(`请传入"${apiName}"已配置的params`);
        }
        let reg = /\/:\w*/g;
        let u = url.replace(reg, function(p, p2) {
            let key = p.substring(2);
            if (param[key] === void 0) {
                throw Error(`"${apiName}"必须包含已配置的"${key}"`);
            }
            return '/' + param[key];
        });
        return u;
    }
}

export default new ServiceInstance({
    config: API_CONFIG,
    ...API_DEFAULT_CONFIG
});
