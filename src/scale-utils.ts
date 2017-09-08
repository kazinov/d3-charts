import { AxisScale } from 'd3-axis';
import { scaleLinear, scaleTime } from 'd3-scale';

export const ScaleTypes = {
    time: 'time',
    linear: 'linear'
};

export interface IScaleConfig {
    type: string,
    format?: string
}


export function getScale (
    config: IScaleConfig,
    range: any[],
    domain: any[]): AxisScale<any> {

    switch (config.type) {
        case ScaleTypes.time:
            return scaleTime()
                .rangeRound(range)
                .domain(domain);

        case ScaleTypes.linear:
            return scaleLinear()
                .rangeRound(range)
                .domain(domain);
    }

    return null;

}