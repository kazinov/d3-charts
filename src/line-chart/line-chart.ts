import * as d3 from 'd3';
import './line-chart.css';

export interface ILineChartConfig {
    size?: number;
    barSize?: number;
    transitionDuration?: number;
    horizontal?: boolean
}

const LineChartConfigDefaults: ILineChartConfig = {
    size: 420,
    barSize: 20,
    transitionDuration: 3500,
    horizontal: false
};

export class LineChart {
    private svg: d3.Selection<any, any, any, any>;
    private _config: ILineChartConfig;
    private valueSide: string;
    private barsSide: string;

    constructor(private container: Element, config?: ILineChartConfig) {
        this.config(config);
        this.init();
    }

    private init() {
        console.log('this.valueSide, this._config.size', this.valueSide, this._config.size)
        this.svg = d3.select(this.container)
            .append('svg').attr(this.valueSide, this._config.size)
            .classed('line-chart', true);
    }

    config(config?: ILineChartConfig) {
        this._config = Object.assign(LineChartConfigDefaults, config);
        this.valueSide = this._config.horizontal ? 'width' : 'height';
        this.barsSide = this._config.horizontal ? 'height' : 'width';
    }

    update(data: number[]) {
        const horizontal = this._config.horizontal;
        const maxData = d3.max(data);
        const x = d3.scaleLinear()
            .domain([0, maxData])
            .range([0, this._config.size]);

        const xModulo = (d: number) => {
            return x(maxData) - x(d);
        };

        var chart = this.svg
            .attr(this.barsSide, this._config.barSize * data.length);

        var bar = chart.selectAll('g').data(data);
        bar.exit().remove();

        const barEnter = bar.enter().append('g');

        barEnter.attr('transform',
            (d, i) => {
                return horizontal ?
                    'translate(0,' + i * this._config.barSize + ')' :
                    'translate(' + i * this._config.barSize + ', 0)'
            });

        barEnter.append('rect')
            .attr('transform',
                (d) => {
                    return horizontal ? 'translate(0,0)' : 'translate(0, ' + x(maxData) + ')'
                })
            .merge(bar.select('rect'))
            .transition()
            .duration(this._config.transitionDuration)
            .attr(this.valueSide, x)
            .attr(this.barsSide, this._config.barSize - 1)
            .attr('transform', (d) => {
                return horizontal ? 'translate(0,0)' : 'translate(0, ' + xModulo(d) + ')'
            });

        let textMargin = horizontal ? -3 : 10;
        barEnter.append('text')
            .attr(horizontal ? 'x' : 'y', (d) => {
                return horizontal ? textMargin : x(maxData) + textMargin;
            })
            .merge(bar.select('text'))
            .transition()
            .duration(this._config.transitionDuration)
            .attr(horizontal ? 'x' : 'y', (d) => {
                return (horizontal ? x(d) : xModulo(d)) + textMargin;
            })
            .attr(horizontal ? 'y' : 'x', this._config.barSize / 2)
            .attr(horizontal ? 'dy' : 'dx', '.35em')
            .text((d) => {
                return d;
            });

    }
}