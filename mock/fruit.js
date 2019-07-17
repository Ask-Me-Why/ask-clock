/*
* @Author: AskMeWhy
* @Date:   2019-05-28 13:50:12
* @Last Modified by:   AskMeWhy
* @Last Modified time: 2019-06-10 12:00:38
*/
const Mock = require('mockjs') // 获取mock对象

let lists = [];
let Random = Mock.Random;
let count = Random.integer(100,200);

lists = Array.apply(null, { length: count }).map((item, index) => {
	return Mock.mock({
		"name":"@cword('葡萄香蕉苹果梨子车厘子枇杷西瓜草莓水晶橙子橘子火龙果凤梨菠萝',2,6)",
		"price": "@float(4,100,0,2)",
		"desc": "@csentence(50,100)",
		"address": "@county(true)",
		"id": 11111+index,
		"image" : '/public/fruit.png',
		"time": "@datetime('yyyy年MM月dd日 HH时mm分ss秒')"
	})
})
module.exports = [
	{
		url: 'list',
		method: 'get',
		response: payload => {
			const { page = 1, limit = 20 }= payload.headers;
			console.log(payload.headers)
			const pageList = lists.filter((item, index) => index < limit * page && index >= limit * (page - 1));
			return{
				code: 200,
				data:{
					total: lists.length,
					page: page,
					limit: limit,
					list: pageList
				}
			}
		}
	},
	{
		url: 'detail',
		method: 'post',
		response: payload => {
			const { id }= payload.body;
			const res = lists.filter((item, index) => item.id === +id);
			return{
				code: 200,
				data:res
			}
		}
	},

]