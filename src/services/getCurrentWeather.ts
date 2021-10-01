
import { ForecastType as Forecast, Unit } from './../App';

export const getCurrentWeather = async (cityName: string, units: Unit = Unit.Standard): Promise<Forecast> => {
	const URL = 'https://api.openweathermap.org/data/2.5/weather';
	const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
	const response = await fetch(`${URL}?q=${cityName}&units=${units}&appid=${apiKey}`);

	const data = await response.json();

	return data;
}