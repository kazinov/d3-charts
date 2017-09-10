import { BarChart } from './bar-chart/bar-chart';
import { IPoint, LineChart } from './line-chart/line-chart';
import {getRandomDate, getLineChartData, random, getLineChartSeries} from "./data-utils";
import {ScaleTypes} from "./scale-utils";

const interval = 2000;
const barChart = new BarChart(document.getElementById('bar-chart-container'));
const lineChart = new LineChart(document.getElementById('line-chart-container'));
const lineChart2 = new LineChart(document.getElementById('line-chart2-container'), {
    yScale: {
        type: ScaleTypes.time,
        format: '%d-%m-%y'
    },
    xScale: {
        type: ScaleTypes.linear
    }
});

function updateBarChart() {
    const rows = random(1) || 1;
    const data = [];
    for (var i = 0; i < rows; i++) {
        data.push(random());
    }
    barChart.update(data);
}

setInterval(() => {
    updateBarChart();
    lineChart.update(getLineChartSeries(getRandomDate, random));
    lineChart2.update(getLineChartSeries(random, getRandomDate));
}, interval);