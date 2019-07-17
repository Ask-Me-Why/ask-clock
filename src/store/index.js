/*
 * @Author: askMeWhy
 * @Date:   2017-12-29 14:44:52
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-06-10 11:15:00
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { merge } from '../utils/tool.kit.js';
import { sessionStorage } from '../utils/storage.js';

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
Vue.use(Vuex);
const storeGetters = () => {
    let obj = {};
    Object.keys(getters).forEach((key) => {
        obj = merge(true, obj, getters[key]);
    });
    return obj;
};
const storeMutations = () => {
    let obj = {};
    Object.keys(mutations).forEach((key) => {
        obj = merge(true, obj, mutations[key]);
    });
    return obj;
};
const storeActions = () => {
    let obj = {};
    Object.keys(actions).forEach((key) => {
        obj = merge(true, obj, actions[key]);
    });
    return obj;
};

export default new Vuex.Store({
    strict: true,
    state: {
        ajaxLoader: false,
        ajaxLoaderIndex: 0,
        user: {
            userInfo: (() => {
                let userInfo = sessionStorage.getItem('userInfo');
                return userInfo || null;
            })(),
            auth: (() => {
                let auth = sessionStorage.getItem('auth');
                return auth || null;
            })(),
            isSignIn: (() => {
                let auth = sessionStorage.getItem('auth');
                return !!(auth && auth.key && auth.sessionId);
            })()
        }
    },
    getters: storeGetters(),
    mutations: storeMutations(),
    actions: storeActions(),
    modules: {}
});
