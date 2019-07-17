/*
 * @Author: AskMeWhy
 * @Date:   2019-06-05 16:55:26
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-06-18 15:17:18
 */
import Vue from 'vue';
import ComponentTemplate from './modal.vue';
import { merge, isObject, isEmptyObject } from '@/utils';
const VueComponent = Vue.extend(ComponentTemplate);
export const askLoader = (option) => {
    let vm = new VueComponent().$mount();
    let opt = {
        text: null,
        color: 'green',
        indeterminate: true,
        rotate: 0,
        size: 32,
        value: 0,
        width: 4
    };
    opt = merge(true, opt, option);

    Object.keys(opt).forEach((cur) => {
        vm[cur] = opt[cur];
    });
    let loaderIndex = 0;
    const loader = (state, config = null) => {
        if (state && config && isObject(config) && !isEmptyObject(config)) {
            Object.keys(config).forEach((cur) => {
                vm[cur] = opt[cur];
            });
        }
        if (state) {
            if (loaderIndex === 0) vm.show = true;
            loaderIndex++;
        } else {
            setTimeout(() => {
                loaderIndex--;
                if (loaderIndex === 0) vm.show = false;
            }, 300);
        }
    };
    return {
        vm: vm,
        loader
    };
};
