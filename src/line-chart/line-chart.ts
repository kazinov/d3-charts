import * as d3 from 'd3';
import './line-chart.css';

export const ScaleTypes = {
    time: 'time',
    linear: 'linear'
};

export interface IAxisScaleRangeable<Domain> extends d3.AxisScale<Domain> {
    rangeRound(range: Array<number | { valueOf(): number }>): this;
}

export interface IParseFunction {
    (input: any): any;
}

export interface IScaleConfig {
    type: string,
    format?: string
}

export interface ILineChartConfig {
    width?: number,
    height?: number,
    margin?: { top: number, right: number, bottom: number, left: number },
    xScale?: IScaleConfig;
    yScale?: IScaleConfig;
}

const LineChartConfigDefaults: ILineChartConfig = {
    width: 600,
    height: 400,
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
    private axisG: d3.Selection<any, any, any, any>;
    private _config: ILineChartConfig;

    constructor(private container: Element, config?: ILineChartConfig) {
        this.config(config);
        this.init();
    }

    private init() {
        this.svg = d3.select(this.container)
            .append('svg')
            .classed('line-chart', true);
        this.g = this.svg.append('g');
        this.axisG = this.g.append('g');
        this.pathG = this.g.append('g');
    }

    config(config?: ILineChartConfig) {
        this._config = Object.assign(LineChartConfigDefaults, config);
    }

    update(data: IPoint[]) {
        const width = this._config.width - this._config.margin.left - this._config.margin.right;
        const height = this._config.height - this._config.margin.top - this._config.margin.bottom;

        this.svg
            .attr('width', this._config.width)
            .attr('height', this._config.height);

            this.g.attr('transform', 'translate(' + this._config.margin.left + ',' + this._config.margin.top + ')');

        let xScale: d3.ScaleTime<number, number>;
        let yScale: d3.ScaleLinear<number, number>;
        let parseX: IParseFunction;
        let parseY: IParseFunction;

        xScale = d3.scaleTime();
        parseX = d3.timeParse(this._config.xScale.format);

        yScale = d3.scaleLinear();

        xScale = xScale.rangeRound([0, width]);
        yScale = yScale.rangeRound([height, 0]);

        var line = d3.line<IPoint>()
            .x(function (d: IPoint) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            });

        if (parseX || parseY) {
            data = data.map((point: IPoint) => {
                if (parseX) {
                    point.x = parseX(point.x);
                }

                if (parseY) {
                    point.y = parseY(point.y);
                }

                return point;
            });
        }

        function sortByDateAscending(a, b) {
            // Dates will be cast to numbers automagically:
            return a.date - b.date;
        }

        data = data.sort((a: IPoint, b:IPoint) => {
            return a.x - b.x;
        });

        xScale.domain(d3.extent(data, (d) => {
            return d.x;
        }));

        yScale.domain(d3.extent(data, (d) => {
            return d.y;
        }));

        this.axisG.selectAll('.x-axis').remove();
        this.axisG.selectAll('.y-axis').remove();

        const gAxisX = this.axisG.append('g').classed('x-axis', true);
        const gAxisY = this.axisG.append('g').classed('y-axis', true);

        gAxisX
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(xScale)
                .ticks(5)
                .tickSize(-height));

        gAxisY
            .call(d3.axisLeft(yScale)
                .ticks(5)
                .tickSize(-width));

        const path = this.pathG.selectAll('path')
            .data([data]);

        path.exit().remove();

        const pathEnter = path.enter().append('path');


        pathEnter
            .merge(path)
            .attr('transform', 'translate(1, 0)')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .transition()
            .duration(500)
            .attr('d', line);

    }
}