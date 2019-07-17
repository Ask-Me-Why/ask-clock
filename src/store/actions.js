/*
 * @Author: askMeWhy
 * @Date:   2017-12-29 14:44:52
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-06-05 17:15:53
 */
import {
    AJAX_REQUEST,
    AJAX_REQUEST_COMPLETE
} from './mutations-types';
export const ajaxActions = {
    ajaxRequestStart({ commit }) {
        commit(AJAX_REQUEST);
    },
    ajaxRequestEnd({ commit }) {
        setTimeout(() => {
            commit(AJAX_REQUEST_COMPLETE);
        }, 300);
    }
};
