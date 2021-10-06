import { useState } from 'react';
import { ForecastType} from '../App';

import { ConditionImage } from './ConditionImage';

import './Forecast.css';

interface Props {
	forecast: ForecastType,
	units?: string
}

export const Forecast: React.FC<Props> = ({forecast, units }) => {
	const [newUnits,setNewUnits]=useState<string | undefined>(units);
	const [newUnit,setNewUnit]=useState(Math.floor(forecast.main.temp_max)/Math.floor(forecast.main.temp_min));	
	const [celsius, setCelsius] = useState(units==='ºC'?true:false);
	const [kelvin, setKelvin] = useState(units==='K'?true:false);
	const [fahrenheit, setFahrenheit] = useState(units==='ºF'?true:false);

	
	const convertTempUnit = (event:any) => {
		let newUnit:string=event.target.value;		
		let ans:number=Math.floor(forecast.main.temp_max)/Math.floor(forecast.main.temp_min);
		console.log(fahrenheit,celsius,kelvin,newUnit,units)
		if(newUnit==="Fahrenheit"){
			 ans=(ans * 9/5)+32;
			 setFahrenheit(true);
			 setKelvin(false);
			 setCelsius(false);
			 setNewUnits("ºF");
		}
		else if( newUnit==="Kelvin"){
			 ans=ans + 273.15;
			 setKelvin(true);
			  setFahrenheit(false);
			 setCelsius(false);
			 setNewUnits("K");

		}
		else{
			 setCelsius(true);
			 setFahrenheit(false);
			 setKelvin(false);
			 setNewUnits("ºC")
		}
		setNewUnit(ans);
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
					{newUnit}{newUnits}
				</span>
			</div>
			<div className="temp-units">
				<input type="checkbox" value="Celsius" name="Celsius"  onChange={convertTempUnit} checked={celsius}/>
				  <label> Celsius</label>
				<input type="checkbox" value="Kelvin" name="Kelvin"  onChange={convertTempUnit} checked={kelvin}/>
				  <label> Kelvin</label>
				<input type="checkbox" name="Fahrenheit" value="Fahrenheit"  onChange={convertTempUnit} checked={fahrenheit}/>
				  <label> Fahrenheit</label>
				
			</div>
		</div>
	);
}
