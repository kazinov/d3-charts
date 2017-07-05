import { LineChart } from './line-chart/line-chart.ts';

const lineChart = new LineChart(document.getElementById('line-chart-container'));
lineChart.updateData([4, 8, 15, 16, 23, 42]);