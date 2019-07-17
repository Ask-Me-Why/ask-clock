/*
 * @Author: AskMeWhy
 * @Date:   2019-05-28 10:38:32
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-05-30 11:56:10
 */
const Mock = require('mockjs') // 获取mock对象

const bodyParser = require('body-parser')
const path = require('path');
const express = require('express');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = app => {

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
	  extended: true
	}))
	
	const routers = require('./index.js')
	for (router of routers) {
		app[router.method](router.url,router.response)
	}
}
