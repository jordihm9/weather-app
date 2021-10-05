import { ForecastType, Unit } from '../App';

import { ConditionImage } from './ConditionImage';

import './Forecast.css';

interface Props {
	forecast: ForecastType,
	units?: Unit
}

export const Forecast: React.FC<Props> = ({forecast, units = Unit.Standard}) => {
	const tempUnit = (): string => {
		switch (units) {
			case Unit.Metric: return 'ºC';//'&#8451;'
			case Unit.Imperial: return 'ºF';//'&#8457;'
			default: return 'K';//'&#8490;'
		}
	}

	return (
		<div className="current-forecast">
			<ConditionImage weather={forecast.weather[0]} />
			<div className="location-name">
				{forecast.name}
			</div>
			<div className="details">
				<span className="condition">{forecast.weather[0].main} </span>
				<span className="temperatures">
					{Math.floor(forecast.main.temp_max)}/{Math.floor(forecast.main.temp_min)}{tempUnit()}
				</span>
			</div>
		</div>
	);
}
