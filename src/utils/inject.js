/*
 * @Author: askMeWhy
 * @Date:   2018-07-05 11:09:34
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-06-18 16:20:42
 */
import Api from 'services';
import ASKComponents from '@core/ask';
import { askLoader } from '@core/ask/ask-loader/index.js';
import { askToast } from '@core/ask/ask-toast/ask.toast.js';
export default {
    install: (Vue, options) => {
        Object.defineProperty(Vue.prototype, '$server', {
            get() { return Api.server; }
        });
        Object.defineProperty(Vue.prototype, '$info', {
            get() { return Api.info; }
        });
        Vue.use(ASKComponents);
        let loader = askLoader();
        Object.defineProperty(Vue.prototype, '$askLoader', {
            get() { return loader.loader; }
        });
        Object.defineProperty(Vue.prototype, '$askToast', {
            get() { return askToast; }
        });
        // 需要挂载的都放在这里
    }
};
