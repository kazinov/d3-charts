import './line-chart.css';
import { IScaleConfig, ScaleTypes, getScale } from '../scale-utils';
import { select } from 'd3-selection';
import 'd3-transition';
import { extent, axisBottom } from 'd3';
import { line } from 'd3-shape';
import { axisLeft } from 'd3-axis';

export interface ISeries {
	data: IPoint[],
	color?: string,
}

export interface IAxisScaleRangeable<Domain> extends d3.AxisScale<Domain> {
    rangeRound(range: Array<number | { valueOf(): number }>): this;
}

export interface ILineChartConfig {
    width?: number,
    height?: number,
    margin?: { top: number, right: number, bottom: number, left: number },
    xScale?: IScaleConfig;
    yScale?: IScaleConfig;
}

const LineChartConfigDefaults: ILineChartConfig = {
    width: 400,
    height: 300,
    margin: {top: 20, right: 20, bottom: 30, left: 50},
    xScale: {
        type: ScaleTypes.time,
        format: '%d-%m-%y'
    },
    yScale: {
        type: ScaleTypes.linear
    }
};

export interface IPoint {
    x: any,
    y: any
}

export interface ILineChartData {
    [index: number]: IPoint
}

export class LineChart {
    private svg: d3.Selection<any, any, any, any>;
    private g: d3.Selection<any, any, any, any>;
    private pathG: d3.Selection<any, any, any, any>;
    private gAxisX: d3.Selection<any, any, any, any>;
    private gAxisY: d3.Selection<any, any, any, any>;
    private _config: ILineChartConfig;

    constructor(private container: Element, config?: ILineChartConfig) {
        this.config(config);
        this.init();
    }

    private init() {
        this.svg = select(this.container)
            .append('svg')
            .classed('line-chart', true);
        this.g = this.svg.append('g');
        this.gAxisX = this.g.append('g').append('g').classed('x-axis', true);
        this.gAxisY = this.g.append('g').append('g').classed('y-axis', true);
        this.pathG = this.g.append('g');
    }

    config(config?: ILineChartConfig) {
        this._config = Object.assign({}, LineChartConfigDefaults, config);
    }

    update(series: ISeries) {
    	const data = series.data;
        const width = this._config.width - this._config.margin.left - this._config.margin.right;
        const height = this._config.height - this._config.margin.top - this._config.margin.bottom;

        this.svg
            .attr('width', this._config.width)
            .attr('height', this._config.height);

            this.g.attr('transform', 'translate(' + this._config.margin.left + ',' + this._config.margin.top + ')');

        let xScale = getScale(this._config.xScale, [0, width], extent(data, (d) => d.x));
        let yScale = getScale(this._config.yScale, [height, 0], extent(data, (d) => d.y));

        const xyLine = line<IPoint>()
            .x((d: IPoint) => xScale(d.x))
            .y((d: IPoint) => yScale(d.y));

        this.gAxisX
            .attr('transform', 'translate(0,' + height + ')')
            .transition()
            .duration(500)
            .call(axisBottom(xScale)
                .ticks(5)
                .tickSize(-height));

        this.gAxisY
            .transition()
            .duration(500)
            .call(axisLeft(yScale)
                .ticks(5)
                .tickSize(-width));

        const path = this.pathG.selectAll('path')
            .data([data]);

        path.exit().remove();

        const pathEnter = path.enter().append('path');

        pathEnter
            .merge(path)
            .attr('transform', 'translate(0.5, 0.5)')
            .attr('fill', 'none')
            .attr('stroke', series.color || 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1)
            .transition()
            .duration(500)
            .attr('d', xyLine);

    }
}