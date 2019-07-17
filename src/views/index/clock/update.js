/*
 * @Author: askMeWhy
 * @Date:   2018-10-19 16:37:18
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-07-17 14:48:50
 */
import * as d3 from 'd3';
// 更新时间文本
export const updateTime = function() {
    let { chartGroup, clock } = this;
    if (!clock.time.change) {
        return;
    }
    if (clock.time.val[2] % 10 === 0) {
        this.emit('_updateTime:m');
    }
    this.emit('_updateTime:s');
    let _box = chartGroup.selectAll('g.clock-date-group.time');
    _box.select('text.clock-time')
        .text(function(d) {
            return clock.time.val[0] + ':' + clock.time.val[1] + ':' + clock.time.val[2];
        });
};

// 更新日期文本
export const updateDate = function() {
    let { chartGroup, clock } = this;
    if (!clock.date.change) {
        return;
    }
    let _box = chartGroup.selectAll('g.clock-date-group.date');
    _box.select('text.clock-text')
        .text(function(d) {
            return clock.date.val[0] + '年' + clock.date.val[1] + '月' + clock.date.val[2] + '日';
        });
};

// 更新农历日期文本
export const updateLunarDate = function() {
    let { chartGroup, clock } = this;
    if (!clock.date.change) {
        return;
    }
    let _box = chartGroup.selectAll('g.clock-date-group.lunar-date');
    _box.select('text.clock-text')
        .text(function(d) {
            return clock.date.val[0] + '年' + clock.date.val[1] + '月' + clock.date.val[2] + '日';
        });
};

export const updateCircle = function() {
    let { chartGroup } = this;
    let circle = chartGroup.selectAll('circle.circle-rotate');
    let _rotate = 0;
    const _updateTimeM = function() {
        if (this.lastRotate >= 360) {
            _rotate = 0;
        } else {
            _rotate = this.lastRotate + 45;
        }
        circle
            .attr('transform', 'rotate(' + -this.lastRotate + ')')
            .transition(300)
            .duration(500)
            .ease(d3.easeExpOut)
            .attr('transform', 'rotate(' + -_rotate + ')');
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.lastRotate = _rotate;
        }, 800);
    };

    this.on('_updateTime:m', _updateTimeM);
    setTimeout(() => {
        this.off('_updateTime:m', _updateTimeM);
    }, 0);
};

export const updateNode = function() {
    let { chartGroup } = this;
    let nodeGroup = chartGroup.selectAll('g.node-group');
    let nodeData = nodeGroup.selectAll('g.node');
    let _rotate = 0;
    const _updateTimeS = function() {
        let t = d3.timer(function(elapsed) {
            nodeData.attr('transform', function(d) {
                let s = (elapsed % 300) / 300;
                return 'translate(' + d.x + ',' + (d.y - d3.easeElasticIn(s) * 4) + ')';
            });
            if (elapsed > 300) t.stop();
        });
    };
    const _updateTimeM = function() {
        if (this.lastRotate >= 360) {
            _rotate = 0;
        } else {
            _rotate = this.lastRotate + 45;
        }
        nodeGroup
            .attr('transform', 'rotate(' + this.lastRotate + ')')
            .transition(300)
            .duration(500)
            .ease(d3.easeExpOut)
            .attr('transform', 'rotate(' + _rotate + ')');
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.lastRotate = _rotate;
        }, 800);
    };
    this.on('_updateTime:s', _updateTimeS);
    this.on('_updateTime:m', _updateTimeM);
    setTimeout(() => {
        this.off('_updateTime:s', _updateTimeS);
        this.off('_updateTime:m', _updateTimeM);
    }, 0);
};
