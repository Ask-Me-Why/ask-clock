/*
 * @Author: AskMeWhy
 * @Date:   2019-05-28 14:37:03
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-06-05 15:06:37
 */

const Mock = require('mockjs') // 获取mock对象
const fruit = require('./fruit.js');

let mocks = [...fruit];

module.exports = mocks.map(mock => {
    let { url, method, response } = mock;
    return {
        url: `/mock/${mock.url}`,
        method: mock.method,
        response: (req, res) => {
            res.json(Mock.mock(response instanceof Function ? response(req, res) : response));
        }
    }
})
