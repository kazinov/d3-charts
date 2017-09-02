import { BarChart } from './bar-chart/bar-chart';

const lineChart = new BarChart(document.getElementById('bar-chart-container'));
lineChart.update([4, 8, 15, 16, 23, 42]);


const dataInput: HTMLInputElement = <HTMLInputElement>document.getElementById('data');
dataInput.addEventListener('change', () => {
    const numberPattern = /\d+/g;

    let datum: number[] = [];
    const numbers = dataInput.value.match(numberPattern);
    if (numbers && numbers.length) {
        datum = numbers.map((val: string) => + val);
    }

    lineChart.update(datum);
});