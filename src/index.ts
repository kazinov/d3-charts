import { LineChart } from './line-chart/line-chart.ts';

const lineChart = new LineChart(document.getElementById('line-chart-container'));
lineChart.updateData([4, 8, 15, 16, 23, 42]);


const dataInput: HTMLInputElement = <HTMLInputElement>document.getElementById('data');
dataInput.addEventListener('change', () => {
    const numberPattern = /\d+/g;

    let datum: number[] = [];
    const numbers = dataInput.value.match(numberPattern);
    if (numbers && numbers.length) {
        datum = numbers.map((val: string) => + val);
    }

    lineChart.updateData(datum);
});