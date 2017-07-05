import * as d3 from 'd3';
import './line-chart.css';

export class LineChart {
    private svg = d3.select(this.container).append("svg").classed('line-chart', true);

    constructor(private container: Element, private width = 420, private barHeight = 20) {
    }

    updateData(data: number[]) {
        const x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, this.width]);

        var chart = this.svg
            .attr("width", this.width)
            .attr("height", this.barHeight * data.length);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", (d, i) => { return "translate(0," + i * this.barHeight + ")"; });

        bar.append("rect")
            .attr("width", x)
            .attr("height", this.barHeight - 1);

        bar.append("text")
            .attr("x", (d) => { return x(d) - 3; })
            .attr("y", this.barHeight / 2)
            .attr("dy", ".35em")
            .text((d) => { return d; });
    }
}