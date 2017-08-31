import * as d3 from 'd3';
import './line-chart.css';
import { selection } from 'd3-selection';

export interface ILineChartConfig {
    width?: number;
    barHeight?: number;
    transitionDuration?: number;
}

const LineChartConfigDefaults: ILineChartConfig = {
    width: 420,
    barHeight: 20,
    transitionDuration: 500
};

export class LineChart {
    private svg: d3.Selection<any, any, any, any>;
    private config: ILineChartConfig;

    constructor(private container: Element, config?: ILineChartConfig) {
        this.config = Object.assign(LineChartConfigDefaults, config);
        this.init();
    }

    private init() {
        this.svg = d3.select(this.container)
            .append('svg').attr('width', this.config.width)
            .classed('line-chart', true);
    }

    updateData(data: number[]) {
        const x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, this.config.width]);

        var chart = this.svg
            .attr('height', this.config.barHeight * data.length);

        var bar = chart.selectAll('g').data(data);
        bar.exit().remove();

        const barEnter = bar.enter().append('g');

        barEnter.attr('transform', (d, i) => { return 'translate(0,' + i * this.config.barHeight + ')'; })

        barEnter.append('rect')
            .merge(bar.select('rect'))
            .transition()
            .duration(this.config.transitionDuration)
            .attr('width', x)
            .attr('height', this.config.barHeight - 1);

        barEnter.append('text')
            .merge(bar.select('text'))
            .transition()
            .duration(this.config.transitionDuration)
            .attr('x', (d) => { return x(d) - 3; })
            .attr('y', this.config.barHeight / 2)
            .attr('dy', '.35em')
            .text((d) => { return d; });

    }
}