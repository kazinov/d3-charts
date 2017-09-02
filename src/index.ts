import { BarChart } from './bar-chart/bar-chart';

const interval = 2000;
const lineChart = new BarChart(document.getElementById('bar-chart-container'));

const random = (order: number = 2) => {
    const o = 10 * order;
    return Math.round(Math.random() * o);
};

setInterval(() => {
    const rows = random(1) || 1;
    const data = [];
    for (var i = 0; i < rows; i++) {
        data.push(random());
    }
    lineChart.update(data);
}, interval);