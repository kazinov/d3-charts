import { LineChart } from './line-chart/line-chart.ts';

console.log('started 2')

const lineChart = new LineChart(document.getElementsByClassName('line-chart')[0]);
lineChart.updateData([4, 8, 15, 16, 23, 42]);