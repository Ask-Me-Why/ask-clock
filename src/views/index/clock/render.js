/*
 * @Author: askMeWhy
 * @Date:   2018-10-19 16:37:08
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-07-17 15:17:44
 */
import * as d3 from 'd3';
// import equipmentNormalImage from '@/assets/bg1.jpg';
// import equipmentNormalImage2 from '@/assets/bg2.jpg';
// 渲染SVG容器和初始化chartGroup
export const renderSvg = function() {
    let _w = this.$el.clientWidth;
    let _h = this.$el.clientHeight;
    this.realW = _w - this.padding.right - this.padding.left;
    this.realH = _h - this.padding.top - this.padding.bottom;

    let _svg;

    this.maxRadius = Math.floor(Math.min(this.realW, this.realH));

    this.svg = _svg = d3.select(this.$el)
        .select('svg')
        .attr('width', _w)
        .attr('height', _h);

    this.chartGroup = _svg.append('g')
        .attr('class', 'chart-source-group')
        .attr('transform', 'translate(' + _w / 2 + ',' + (_h / 2) + ')');
};
// 渲染日期
export const renderDate = function() {
    let { chartGroup, rLinear, clock, maxRadius } = this;
    let _box = chartGroup.append('g').attr('class', 'clock-date-group.date');
    let _text = _box.append('text')
        .attr('class', 'clock-text')
        .attr('stroke', 'none')
        .text(function(d) {
            return clock.date.val[0] + '年' + clock.date.val[1] + '月' + clock.date.val[2] + '日';
        });
    
    
    let _textRec = _text.node().getBoundingClientRect();
    _text.attr('textLength', rLinear(0.6));
    _box.attr('transform', function(d) {
        return 'translate(' + -rLinear(0.6) / 2 + ',' + -rLinear(_textRec.height / maxRadius) * 2 + ')';
    });
};

// 渲染农历日期
export const renderLunarDate = function() {
    let { chartGroup, rLinear, clock, maxRadius } = this;
    let _box = chartGroup.append('g').attr('class', 'clock-date-group.lunar-date');
    let _text = _box.append('text')
        .attr('class', 'clock-tip')
        .attr('stroke', 'none')
        .text(function(d) {
            // return clock.date.val[0] + '年' + clock.date.val[1] + '月' + clock.date.val[2] + '日';
            return 'for big-wave YY 长得丑玩的花';
        });
    let _textRec = _text.node().getBoundingClientRect();
    _text.attr('textLength', rLinear(0.7));
    _box.attr('transform', function(d) {
        return 'translate(' + -rLinear(0.7) / 2 + ',' + rLinear(.18) + ')';
    });
};

// 渲染时间
export const renderTime = function() {
    let { chartGroup, rLinear, clock } = this;
    let _box = chartGroup.append('g').attr('class', 'clock-date-group time');
    let _text = _box.append('text')
        .attr('class', 'clock-time')
        .attr('stroke', 'none')
        .text(function(d) {
            return clock.time.val[0] + ':' + clock.time.val[1] + ':' + clock.time.val[2];
        });
    // let _textRec = _text.node().getBoundingClientRect();
    // _text.attr('textLength', rLinear(0.6));
    _box.attr('transform', function(d) {
        return 'translate(' + -rLinear(0.6) / 2 + ',' + rLinear(0.05) + ')';
    });
};

// 渲染圆环
export const renderCircle = function() {
    let { chartGroup, rLinear } = this;
    let r = rLinear(0.44);
    let length = Math.PI * (r * 2);
    let circle = chartGroup
        .append('circle')
        .attr('r', r)
        .attr('stroke-linecap', 'round')
        .attr('stroke-dasharray', '14')
        .attr('stroke-dashoffset', -length)
        .classed('circle', true)
        .classed('circle-rotate', true);
    circle
        .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .attr('stroke-dashoffset', 0);
};

// 渲染节点
export const renderNode = function() {
    let { chartGroup, rLinear, nodes } = this;
    let nodeGroup = chartGroup.append('g').classed('node-group', true);
    let nodeData = nodeGroup
        .selectAll('g.node')
        .data(nodes, function(d) {
            return d.key;
        });

    let r = rLinear(0.02);
    let nodeEnter = nodeData.enter();
    nodeEnter.append('g')
        .classed('node', true)
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        })
        .append('circle')
        .attr('r', r)
        .attr('fill', 'url(#Gradient)');
};
