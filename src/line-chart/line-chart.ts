import * as d3 from 'd3';
import './line-chart.css';
import { selection } from 'd3-selection';

export class LineChart {
    private svg = d3.select(this.container).append("svg").attr("width", this.width).classed('line-chart', true);

    constructor(private container: Element, private width = 420, private barHeight = 20) {
    }

    updateData(data: number[]) {
        const x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, this.width]);

        var chart = this.svg
            .attr("height", this.barHeight * data.length);

        const g = (selection: d3.Selection<any, any, any, any>) => {
            selection.attr("transform", (d, i) => { return "translate(0," + i * this.barHeight + ")"; })
        }

        const rect = (selection: d3.Selection<any, any, any, any>) => {
            selection
                .transition()
                .duration(750)
                .attr("width", x)
                .attr("height", this.barHeight - 1);
        }

        const text = (selection: d3.Selection<any, any, any, any>) => {
            selection
                .attr("x", (d) => { return x(d) - 3; })
                .attr("y", this.barHeight / 2)
                .attr("dy", ".35em")
                .text((d) => { return d; });
        }


        var bar = chart.selectAll("g").data(data);
        g(bar.select("g"));
        rect(bar.select("rect"));
        text(bar.select("text"));

        const barEnter = bar.enter().append("g");
        g(barEnter);
        rect(barEnter.append("rect"));
        text(barEnter.append("text"));

        bar.exit().remove();
    }
}