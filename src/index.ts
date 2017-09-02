import { BarChart } from './bar-chart/bar-chart';
import { IPoint, LineChart } from './line-chart/line-chart';

const interval = 2000;
// const barChart = new BarChart(document.getElementById('bar-chart-container'));
const lineChart = new LineChart(document.getElementById('line-chart-container'));

const random = (order: number = 2) => {
    const o = Math.pow(10,  order);
    return Math.round(Math.random() * o);
};
//
// function updateBarChart() {
//     const rows = random(1) || 1;
//     const data = [];
//     for (var i = 0; i < rows; i++) {
//         data.push(random());
//     }
//     barChart.update(data);
// }

function updateLineChart() {
    const rows = random();
    let data: IPoint[] = [];
    for (var i = 0; i < rows; i++) {
        data.push({
            x:  `${random(1)}-${random(1)}-${random(1)}`,
            y: random()
        });
    }
    console.log('data', data)
    lineChart.update(data);
}

// updateLineChart();

setInterval(() => {
    // updateBarChart();
    updateLineChart();
}, interval);