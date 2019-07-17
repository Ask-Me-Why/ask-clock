/**
 * 刷新标题
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 */
import { localStorage } from './storage.js';
// 合并对象
export const merge = (...arg) => {
    if (arg.length === 0) {
        throw Error(`merge error=>请传入需要合并的对象`);
    }
    let target = arg[0] || {};
    let depath = false;
    let length = arg.length;
    let i = 1;

    if (Object.prototype.toString.call(target) === '[object Boolean]') {
        depath = target;
        target = arg[i];
        i++;
    }

    if (typeof target !== 'object') {
        target = {};
    }

    if (i === 2 && length <= 1) {
        throw Error(`merge error=>请传入需要合并的对象`);
    }

    for (; i < length; i++) {
        let source = arg[i] || {};
        if (source != null) {
            for (let key in source) {
                let src = target[key];
                let copy = source[key];
                if (target === copy) {
                    continue;
                }
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    if (depath && copy && (isObject(copy) || Array.isArray(copy))) {
                        let clone;
                        if (Array.isArray(copy)) {
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && isObject(src) ? src : {};
                        }
                        target[key] = merge(depath, clone, copy);
                    } else if (copy !== void 0) {
                        target[key] = copy;
                    }
                }
            }
        }
    }
    return target;
};

export const isObject = (target) => {
    return Object.prototype.toString.call(target) === '[object Object]';
};
export const isEmptyObject = (obj) => {
    for (let key in obj) {
        return false;
    }
    return true;
};

export const trim = (payload) => {
    let str = payload;
    let whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (let i = 0, len = str.length; i < len; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (let i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
    // return payload == null ? "" : (payload + "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export const getTransfrom = () => {
    let transform = '';
    // document.createElement() 创建元素节点，
    let divStyle = document.createElement('div').style; // 返回的是一组object对象，里面包含了transform
    // 可能涉及到的几种兼容性写法，通过循环，找出浏览器识别的那个
    // 依次为： 全部、Safari 和 Chrome、firefox、ie9、opera
    let transformArr = ['transfrom', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
    for (let i = 0; i < transformArr.length; i++) {
        if (transformArr[i] in divStyle) {
            // 找到以后立刻返回，结束函数
            transform = transformArr[i];
            return transform;
        }
    }
    return transform;
};

export const debounce = function(func, delay) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
};

export const detectOrient = function(handlerHorizontal, handlerVertical) {
    let data = localStorage.getItem('J-recordOrientX');
    let cw = document.documentElement.clientWidth;
    let _Width = 0;
    let _Height = 0;
    if (!data) {
        let sw = window.screen.width;
        let sh = window.screen.height;

        // 2.在某些机型（如华为P9）下出现 srceen.width/height 值交换，所以进行大小值比较判断
        _Width = sw < sh ? sw : sh;
        _Height = sw >= sh ? sw : sh;
        localStorage.setItem('J-recordOrientX', { w: _Width, h: _Height });
    } else {
        _Width = data.w;
        _Height = data.h;
    }
    if (cw === _Width) {
        // 竖屏
        handlerVertical && handlerVertical();
        return;
    }
    if (cw === _Height) {
        // 横屏
        handlerHorizontal && handlerHorizontal();
    }
};

// swiper的观察者模式
export class ObserverClass {
    constructor(params = {}) {
        const self = this;
        self.params = params;
        // Events
        self.eventsListeners = {};
        if (self.params && self.params.on) {
            Object.keys(self.params.on).forEach((eventName) => {
                self.on(eventName, self.params.on[eventName]);
            });
        }
    }
    on(events, handler, priority) {
        const self = this;
        if (typeof handler !== 'function') return self;
        const method = priority ? 'unshift' : 'push';
        events.split(' ').forEach((event) => {
            if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
            self.eventsListeners[event][method](handler);
        });
        return self;
    }
    once(events, handler, priority) {
        const self = this;
        if (typeof handler !== 'function') return self;

        function onceHandler(...args) {
            handler.apply(self, args);
            self.off(events, onceHandler);
            if (onceHandler.f7proxy) {
                delete onceHandler.f7proxy;
            }
        }
        onceHandler.f7proxy = handler;
        return self.on(events, onceHandler, priority);
    }
    off(events, handler) {
        const self = this;
        if (!self.eventsListeners) return self;
        events.split(' ').forEach((event) => {
            if (typeof handler === 'undefined') {
                self.eventsListeners[event] = [];
            } else {
                self.eventsListeners[event].forEach((eventHandler, index) => {
                    if (eventHandler === handler) {
                        self.eventsListeners[event].splice(index, 1);
                    }
                });
            }
        });
        return self;
    }
    emit(...args) {
        const self = this;
        if (!self.eventsListeners) return self;
        let events;
        let data;
        let context;
        if (typeof args[0] === 'string' || Array.isArray(args[0])) {
            events = args[0];
            data = args.slice(1, args.length);
            context = self;
        } else {
            events = args[0].events;
            data = args[0].data;
            context = args[0].context || self;
        }
        const eventsArray = Array.isArray(events) ? events : events.split(' ');
        eventsArray.forEach((event) => {
            if (self.eventsListeners && self.eventsListeners[event]) {
                const handlers = [];
                self.eventsListeners[event].forEach((eventHandler) => {
                    handlers.push(eventHandler);
                });
                handlers.forEach((eventHandler) => {
                    eventHandler.apply(context, data);
                });
            }
        });
        return self;
    }
};

export class ObserverEvent {
    constructor(el, eventType, fn, options){
        el.addEventListener(eventType, fn, options || false);
        function destoryObserver() {
            el.removeEventListener(eventType, fn);
        }
        return {
            destroy: destoryObserver
        };
    }
};
