/*
 * @Author: askMeWhy
 * @Date:   2018-10-22 13:56:03
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-07-17 11:09:29
 */
import { merge } from '@/utils';
const carouselMethods = {
    start() {
        if (typeof this.carousel.timeout !== 'undefined') {
            return false;
        }
        if (this.carousel.running) {
            return false;
        }
        this.carousel.running = true;
        this.carousel.run();
        return true;
    },
    stop() {
        if (!this.carousel.running) {
            return false;
        }
        if (typeof this.carousel.timeout === 'undefined') {
            return false;
        }
        if (this.carousel.timeout) {
            clearTimeout(this.carousel.timeout);
            this.carousel.timeout = undefined;
        }
        this.carousel.running = false;
        return true;
    },
    pause() {
        this.carousel.stop();
        if (this.carousel.recoveryTimer) {
            clearTimeout(this.carousel.recoveryTimer);
            this.carousel.recoveryTimer = undefined;
        }
        this.carousel.recoveryTimer = setTimeout(() => {
            clearTimeout(this.carousel.recoveryTimer);
            this.carousel.run();
        }, this.carousel.recoveryTime);
    },
    run() {
        this.carousel.timeout = setTimeout(() => {
            this.nextStage();
        }, this.carousel.interval);
    }
};
export default {
    name: 'carousel',
    create() {
        merge(true, this, {
            carousel: {
                interval: 30 * 1000, // 轮播的间隔
                initSlide: 0, // 轮播初始化节点
                index: 0,
                recoveryTime: 4000, // 有操作之后恢复轮播的时间
                recoveryTimer: undefined,
                running: false, // 是否已经在运行中
                timeout: undefined,
                start: carouselMethods.start.bind(this),
                stop: carouselMethods.stop.bind(this),
                pause: carouselMethods.pause.bind(this),
                run: carouselMethods.run.bind(this)
            }
        });
    }
};
