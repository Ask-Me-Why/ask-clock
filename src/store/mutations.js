/*
 * @Author: askMeWhy
 * @Date:   2017-12-29 14:44:52
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-06-05 15:02:46
 */
import {
    AJAX_REQUEST,
    AJAX_REQUEST_COMPLETE
} from './mutations-types';

export const ajaxMutations = {
    [AJAX_REQUEST](state) {
        if (state.ajaxLoaderIndex === 0) state.ajaxLoader = true;
        state.ajaxLoaderIndex++;
    },
    [AJAX_REQUEST_COMPLETE](state, payload) {
        state.ajaxLoaderIndex--;
        if (state.ajaxLoaderIndex === 0) state.ajaxLoader = false;
    }
};
