import { useEffect, useState } from 'react';

import { useTemperatureConverter } from './../hooks/useTemperatureConverter';

import { ForecastType, Unit } from '../App';

import { ConditionImage } from './ConditionImage';

import './Forecast.css';

interface Props {
	forecast: ForecastType,
	setUnit: React.Dispatch<React.SetStateAction<Unit>>,
	unit: Unit
}

type Temperatures = {
	min: number,
	max: number
}

export const Forecast: React.FC<Props> = ({forecast, setUnit, unit}) => {
	const [lastUnit, setLastUnit] = useState<Unit>(unit);
	const [temperatures, setTemperatures] = useState<Temperatures>({
		min: forecast.main.temp_min,
		max: forecast.main.temp_max
	});
	const converter = useTemperatureConverter();

	useEffect(() => {
		setTemperatures({
			min: converter(temperatures.min, lastUnit, unit),
			max: converter(temperatures.max, lastUnit, unit),
		});

		setLastUnit(unit);
	}, [unit]); // eslint-disable-line

	const tempUnit = (): string => {
		switch (unit) {
			case Unit.Metric: return 'ºC';//'&#8451;'
			case Unit.Imperial: return 'ºF';//'&#8457;'
			default: return 'K';//'&#8490;'
		}
	}

	// TODO: uncomment when temperature unit switching UI is implemented
	// const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>, unit: Unit): void => {
	// 	setUnit(unit);
	// }

	return (
		<div className="current-forecast">
			<ConditionImage weather={forecast.weather[0]} />
			<div className="location-name">
				{forecast.name}
			</div>
			<div className="details">
				<span className="condition">{forecast.weather[0].main} </span>
				<span className="temperatures">
					{Math.floor(temperatures.max)}/{Math.floor(temperatures.min)}{tempUnit()}
				</span>
			</div>
			{/* TODO: */}
			{/* <div className="unit-switch">
				<div className="group">
					<input
						type="radio"
						name="unit"
						id={Unit.Metric}
						// value={Unit.Metric}
						onChange={(e) => handleTemperatureChange(e, Unit.Metric)}
					/>
					<label htmlFor={Unit.Metric}>Celsius</label>
				</div>
				<div className="group">
					<input
						type="radio"
						name="unit"
						id={Unit.Imperial}
						// value={Unit.Imperial}
						onChange={(e) => handleTemperatureChange(e, Unit.Imperial)}
					/>
					<label htmlFor={Unit.Imperial}>Farenheit</label>
				</div>
				<div className="group">
					<input
						type="radio"
						name="unit"
						id={Unit.Standard}
						// value={Unit.Standard}
						onChange={(e) => handleTemperatureChange(e, Unit.Standard)}
					/>
					<label htmlFor={Unit.Standard}>Kelvin</label>
				</div>
			</div> */}
		</div>
	);
}
