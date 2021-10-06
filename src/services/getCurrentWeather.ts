
import { ForecastType as Forecast, Unit } from './../App';

export const getCurrentWeather = async (cityName: string, units: Unit = Unit.Standard): Promise<Forecast> => {
	const URL = 'https://api.openweathermap.org/data/2.5/weather';
	const apiKey = "0ebf0e29926cc939f557a936228e1129";
	const response = await fetch(`${URL}?q=${cityName}&units=${units}&appid=${apiKey}`);

	const data = await response.json();

	return data;
}