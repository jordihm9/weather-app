import { useState } from 'react';
import { ForecastType,Unit} from '../App';

import { ConditionImage } from './ConditionImage';

import './Forecast.css';

interface Props {
	forecast: ForecastType,
	units?: Unit
}

function useTemperatureConverter() {
	return function(temp: number, toUnit:Unit):number{
		switch (toUnit) {
		      case Unit.Imperial: 
		      	 temp=Math.floor((temp * 9/5)+32);
				 break;
		      default: 
		      	 temp=Math.floor(temp + 273.15);
				 break;
		}
		return temp;
	}
  
}

export const Forecast: React.FC<Props> = ({forecast, units}) => {
	
	const [tempUnits,setTempUnits]=useState<string>("ºC");
	
	const [temp,setTemp]=useState<number>(Math.floor((Math.floor(forecast.main.temp_max)/Math.floor(forecast.main.temp_min))));
	
	
	const tempConverter = useTemperatureConverter();
	
	const tempUnit = (unit:Unit): string => {
	    switch (unit) {
	      case Unit.Metric:  return 'ºC';//'&#8451;'
	      case Unit.Imperial: return 'ºF';//'&#8457;'
	      default: return 'K';//'&#8490;'
	    }
  	}

	const convertTempUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
		let toUnit:Unit	=event.target.name as Unit;		
		
		let oldTemp:number=Math.floor(Math.floor(forecast.main.temp_max)/Math.floor(forecast.main.temp_min));
		
		let newTemp=tempConverter(oldTemp,toUnit);
		
		setTemp(newTemp);

		setTempUnits(tempUnit(toUnit));
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
					{temp}{tempUnits}
				</span>
			</div>
			{/*<div className="temp-units">
				<input type="checkbox" value="Celsius" name={Unit.Metric}  onChange={convertTempUnit} checked={tempUnits==='ºC'}/>
				  <label> Celsius</label>
				<input type="checkbox" value="Kelvin" name={Unit.Standard}  onChange={convertTempUnit} checked={tempUnits==='K'}/>
				  <label> Kelvin</label>
				<input type="checkbox" name={Unit.Imperial} value="Fahrenheit" onChange={convertTempUnit} checked={tempUnits==='ºF'}/>
				  <label> Fahrenheit</label>
				
			</div>*/}
		</div>
	);
}
