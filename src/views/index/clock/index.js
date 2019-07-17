/*
 * @Author: askMeWhy
 * @Date:   2018-10-19 16:37:27
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-07-17 15:18:31
 */
import * as d3 from 'd3';
import * as moment from 'moment';
import { merge, ObserverClass, ObserverEvent } from '@/utils';
import * as renders from './render.js';
import * as updates from './update.js';
import carousel from './carousel.js';
const methods = merge(true, renders, updates);
const components = [carousel];
export class AskClock extends ObserverClass {
    constructor(params = {}) {
        super(params);
        merge(true, this, {
            $el: null, // 容器el
            /**
             * [data description]
             * @type {Array}
             * {
             *      park_id: null, //停车场id
             *      park_name: null, //停车场名字
             *      link_status: null, //设备状态1=>正常、2=>网络延时、3=>设备故障、4=>网络断开
             * }
             */
            svg: null, // svg容器el
            chartGroup: null, //
            realW: null, // 容器宽度
            realH: null, // 容器高度
            rLinear: null, // 半径的线性比例尺
            maxRadius: null, // 最大半径值
            transitionDuration: 1000, // 过渡默认持续时间
            nodes: [],
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            resizeEvent: null,
            clock: {
                date: {
                    change: true,
                    val: ['2019', '07', '11']
                },
                time: {
                    change: true,
                    val: ['18', '07', '11']
                },
                week: {
                    change: true,
                    val: ['4']
                }
            },
            lastRotate: 0
        });
        Object.keys(methods).forEach((name) => {
            if (!AskClock.prototype[name]) {
                AskClock.prototype[name] = methods[name];
            }
        });
        components.map(cur => {
            if (!AskClock.prototype[cur.name]) {
                AskClock.prototype[cur.name] = cur.proto;
            }
            if (cur.create) {
                cur.create.call(this);
            }
        });
        this.buildParam(params);
        this.recovery();
        this.init();
        return {
            destroy: this.destroy.bind(this),
            recovery: this.recovery.bind(this),
            update: this.update.bind(this)
        };
    }
    // 构建参数
    buildParam(params) {
        let option = {
            el: null,
            carousel: {
                interval: 1000,
                recoveryTime: 1000
            }
        };
        option = merge(true, option, params);

        merge(true, this, {
            $el: option.el,
            carousel: {
                interval: option.carousel.interval,
                recoveryTime: option.carousel.recoveryTime
            }
        });
    }
    buildDate(_forceUpdate = true) {
        let { date, time, week } = this.clock;
        let _clock = moment().format('YYYY_MM_DD-HH_mm_ss-E').split('-');
        let _cDate = _clock[0].split('_');
        let _cTime = _clock[1].split('_');
        let _cWeek = _clock[2].split('_');

        this.clock.date.val = _cDate;
        this.clock.time.val = _cTime;
        this.clock.week.val = _cWeek;
        if (_forceUpdate) {
            this.clock.date.change = true;
            this.clock.time.change = true;
            this.clock.week.change = true;
            return;
        }
        if (_cDate[0] === date[0] && _cDate[1] === date[1] && _cDate[2] === date[2]) {
            this.clock.date.change = false;
        } else {
            this.clock.date.change = true;
        }

        if (_cTime[0] === time[0] && _cTime[1] === time[1] && _cTime[2] === time[2]) {
            this.clock.time.change = false;
        } else {
            this.clock.time.change = true;
        }

        if (_cWeek[0] === week[0]) {
            this.clock.week.change = false;
        } else {
            this.clock.week.change = true;
        }
    }
    // 获取旋转角度
    getPointAngle(start, end) {
        let diffX = end.x - start.x;
        let diffY = end.y - start.y;
        let z = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        let angle = Math.floor(360 / (Math.PI / Math.acos(diffY / z)));
        angle = angle === 0 ? angle : 360 - angle;
        return angle;
    }

    // 构建数据块
    defineNodes() {
        let { rLinear } = this;
        let _length = 6;
        let _nodes = [];
        let r = rLinear(0.44);
        _nodes = Array.apply(null, { length: _length }).map((i, l) => {
            return {
                x: 0,
                y: 0,
                val: l + 2,
                key: l
            };
        });
        this.nodes = _nodes.map((cur, ci) => {
            let theta = (ci + 1) * 2 * Math.PI / _nodes.length;

            cur.x = Math.floor(r * Math.sin(theta));
            cur.y = Math.floor(r * Math.cos(theta));
            return cur;
        });
    }

    // 定义线性比例尺
    defineLiner() {
        this.rLinear = d3.scaleLinear()
            .domain([0, 1])
            .range([0, this.maxRadius]);
    }

    render() {
        this.buildDate();
        this.defineLiner();
        this.defineNodes();
        this.renderCircle();
        this.renderNode();
        this.renderTime();
        this.renderDate();
        this.renderLunarDate();
        this.carousel.start();
    }
    nextStage() {
        this.update();
        this.carousel.run();
    }
    destroy() {
        this.carousel.stop();
        this.emit('destroy');
        if (this.resizeEvent) {
            this.resizeEvent.destroy();
        }
    }
    recovery() {
        // this.emit('recovery');
        // this.resizeEvent = new ObserverEvent(window, 'resize', (e) => {
        //     this.init();
        // })
    }
    update() {
        this.buildDate(false);
        this.updateCircle();
        this.updateNode();
        this.updateTime();
        this.updateDate();
        // this.updateLunarDate();
    }
    init() {
        this.renderSvg();
        this.render();
    }
}
