import {IPoint, ISeries} from "./line-chart/line-chart";

export function random(order: number = 2) {
	const o = Math.pow(10,  order);
	return Math.round(Math.random() * o);
};

export function getRandomDate() {
	return new Date(2000 + random(1), random(1), random(1));
}

export function getLineChartData(getX: () => any, getY: () => any): ISeries {
	const rows = random();
	let data: IPoint[] = [];
	for (var i = 0; i < rows; i++) {
		data.push({
			x:  getX(),
			y: getY()
		});
	}

	data = data.sort((a: IPoint, b:IPoint) => {
		return a.x - b.x;
	});
	return {
		data: data
	};
}

export function getLineChartSeries(getX: () => any, getY: () => any): ISeries[] {
	const series = [];
	for(var i = 0; i < 2; i++) {
		series.push(getLineChartData(getX, getY));
	}
	return series;
}
