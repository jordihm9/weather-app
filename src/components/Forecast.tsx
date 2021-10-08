import { useState } from 'react';
import { ForecastType,Unit} from '../App';

import { ConditionImage } from './ConditionImage';

import './Forecast.css';

interface Props {
	forecast: ForecastType,
	units?: Unit
}

export const Forecast: React.FC<Props> = ({forecast, units}) => {
	
	const [newUnits,setNewUnits]=useState<string>('ºC');
	
	const [newUnit,setNewUnit]=useState(Math.floor(forecast.main.temp_max)/Math.floor(forecast.main.temp_min));	
	
	const [celsius, setCelsius] = useState(units===Unit.Metric?true:false);
	const [kelvin, setKelvin] = useState(units===Unit.Standard?true:false);
	const [fahrenheit, setFahrenheit] = useState(units===Unit.Imperial?true:false);

	const convertTempUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newUnit:string=event.target.name;		
		let ans:number=Math.floor(forecast.main.temp_max)/Math.floor(forecast.main.temp_min);
		switch (newUnit) {
		      case Unit.Metric:  
		      	 setCelsius(true);
				 setFahrenheit(false);
				 setKelvin(false);
				 setNewUnits("ºC");
				 break;
		      case Unit.Imperial: 
		      	 ans=(ans * 9/5)+32;
				 setFahrenheit(true);
				 setKelvin(false);
				 setCelsius(false);
				 setNewUnits("ºF");
				 break;
		      default: 
		      	 ans=ans + 273.15;
				 setKelvin(true);
				  setFahrenheit(false);
				 setCelsius(false);
				 setNewUnits("K");
				 break;
		}
		setNewUnit(ans);
	}
	

	return (
		<div className="current-forecast">
			<ConditionImage weather={forecast.weather[0]} />
			<div className="location-name">
				<h3>
					{forecast.name}
				</h3>
			</div>
			<div className="details">
				<span className="condition">{forecast.weather[0].main} </span>
				<span className="temperatures">
					{newUnit}{newUnits}
				</span>
			</div>
			<div className="temp-units">
				<input type="checkbox" value="Celsius" name={Unit.Metric}  onChange={convertTempUnit} checked={celsius}/>
				  <label> Celsius</label>
				<input type="checkbox" value="Kelvin" name={Unit.Standard}  onChange={convertTempUnit} checked={kelvin}/>
				  <label> Kelvin</label>
				<input type="checkbox" name={Unit.Imperial} value="Fahrenheit" onChange={convertTempUnit} checked={fahrenheit}/>
				  <label> Fahrenheit</label>
				
			</div>
		</div>
	);
}
